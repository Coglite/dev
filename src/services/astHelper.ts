/**Helper service which allows to work with the AST */
import { IComponentExport } from './../stores/ComponentMeta';
import componentPropType from './componentPropType';


const traverse = require('ast-traverse');
const recast = require('recast');
export interface IImportStatement {
    moduleSource: string;
    componentName: string;
    isDefault: boolean;
}

/** Finds the node that is in the given editor position*/
export function findNodeInEditorPosition(position: { row: number, column: number }, ast: any) {
    let foundNode = null;
    let parentNode = null;
    let jsxComponentElement = null;

    position.row = position.row + 1;

    traverse(ast, {
        pre: (node, parent, prop, idx) => {
            if (node.loc && node.loc.start.line === position.row) {
                if (node.loc.start.column <= position.column && node.loc.end.column >= position.column) {
                    if (foundNode) {
                        if (node.loc.start.column >= foundNode.loc.start.column &&
                            node.loc.end.column <= foundNode.loc.end.column) {
                            foundNode = node;
                            parentNode = parent;

                            if (node.type === 'JSXElement') {
                                jsxComponentElement = node;
                            }
                        }
                    } else {
                        foundNode = node;
                        parentNode = parent;

                        if (node.type === 'JSXElement') {
                            jsxComponentElement = node;
                        }
                    }
                }
            }
        }
    });

    return {
        node: foundNode,
        parentNode,
        componentNode: jsxComponentElement
    };
}

/** Finds all the import statements in the AST */
export function getAllImportDeclarations(ast: any) {
    const importDeclarations = [];
    traverse(ast, {
        pre: (node, parent, prop, idx) => {
            if (node.type === 'ImportDeclaration') {
                importDeclarations.push(node);
            }
        }
    });

    return importDeclarations;
}

/** Finds the import declaration of a component */
export function findImportDeclartionOfComponent(componentNode: any, parentNode: any, importDeclarations: any[]) {
    let declaration: IImportStatement = null;

    if (!parentNode) {
        return declaration;
    }

    if (parentNode.type === 'JSXOpeningElement') {
        const name = componentNode.name;
        for (const importDeclation of importDeclarations) {
            for (const specifier of importDeclation.specifiers) {
                if (specifier.local.name === name) {
                    declaration = {
                        moduleSource: importDeclation.source.value,
                        componentName: specifier.local.name,
                        isDefault: specifier.type === 'ImportDefaultSpecifier'
                    };
                }
            }
        }
    }
    return declaration;
}

/** Adds import statement for a newly added component*/
export function addImportStatementForComponent(
    componentExport: IComponentExport, moduleName: string, ast: any) {
    
    const importDeclarations = getAllImportDeclarations(ast);
    if (isImportSourceAlreadyExists(moduleName, importDeclarations)) 
        {addImportSpecifierToExisingImport(componentExport, moduleName, importDeclarations)} 
    
    else {addNewImport(componentExport, moduleName, ast)}
}

/** Returns true if an import exists from a particular source/module*/
function isImportSourceAlreadyExists(source: string, importDeclarations: any[]) {
    for (const importDeclaration of importDeclarations) {
        if (source === importDeclaration.source.value) {
            return true;
        }
    }
    return false;
}

/** Adds a all new import to ast*/
function addNewImport(componentExport: IComponentExport, moduleName: string,  ast: any) {
    const importString = getImportStatementForComponent(componentExport, moduleName);
    const nodes = recast.parse(importString);
    ast.program.body.unshift(nodes.program.body[0]);
}

/** Adds default or named specifier to an existing import*/
function addImportSpecifierToExisingImport(
    componentExport: IComponentExport,
    moduleName: string,
    importDeclarations: any[]
) {
    for (const importDeclaration of importDeclarations) {
        if (moduleName === importDeclaration.source.value) {
            const specifiers = importDeclaration.specifiers;
            if (componentExport.exportType === 'default') {
                if (isDefaultSpecifierExists(specifiers)) {
                    return;
                } else {
                    specifiers.unshift({
                        type: 'ImportDefaultSpecifier',
                        local: {
                            type: 'Identifier',
                            name: componentExport.identifier
                        }
                    });
                }
            } else if (componentExport.exportType === 'named') {
                if (isDefaultSpecifierExists(specifiers)) {
                    return;
                } else {
                    specifiers.push({
                        type: 'ImportSpecifier',
                        local: {
                            type: 'Identifier',
                            name: componentExport.identifier
                        },
                        imported: {
                            type: 'Identifier',
                            name: componentExport.identifier
                        }
                    });
                }
            }
        }
    }
}

/** Checkes if there is a default import in the specifier array */
function isDefaultSpecifierExists(specifiers: any[]) {
    for (const specifier of specifiers) {
        if (specifier.type === 'ImportDefaultSpecifier') {
            return true;
        }
    }

    return false;
}

/** Construct the import statement depending on default or named export */
function getImportStatementForComponent(componentExport: IComponentExport, moduleName) {
    if (componentExport.exportType === 'default') {
        return `import ${componentExport.identifier} from '${moduleName}';`;
    } else if (componentExport.exportType === 'named') {
        return `import { ${componentExport.identifier} } from '${moduleName}';`;
    }
}

/** Retrieves all the available prop values of a react component*/
export function extractPropsFromComponent(reactComponentNode: any) {
    const props = {};

    if (reactComponentNode) {
        for (const attribute of reactComponentNode.openingElement.attributes) {
            if (attribute.value.type === 'Literal') {
                props[attribute.name.name] = attribute.value.value;
            } else if (attribute.value.type === 'JSXExpressionContainer') {
                props[attribute.name.name] = attribute.value.expression.value;
            }
        }
    }

    return props;
}

/** Updates or adds an attribute value of a react component*/
export function addOrUpdatePropertyOfReactComponent(
    componentNode: any,
    propertyName: string,
    value: any,
    propType: string
) {
    let attr = null;
    for (const attribute of componentNode.openingElement.attributes) {
        if (attribute.name.name === propertyName) {
            attr = attribute;
        }
    }

    if (propType === componentPropType.string) {
        if (attr) {
            attr.value.value = value;
            attr.value.raw = value;
        } else {
            componentNode.openingElement.attributes.push({
                type: 'JSXAttribute',
                name: {
                    type: 'JSXIdentifier',
                    name: propertyName
                },
                value: {
                    type: 'Literal',
                    value,
                    raw: value
                }
            });
        }
    } else if (propType === componentPropType.boolean) {
        if (attr) {
            attr.value.expression.value = value;
        } else {
            componentNode.openingElement.attributes.push({
                type: 'JSXAttribute',
                name: {
                    type: 'JSXIdentifier',
                    name: propertyName
                },
                value: {
                    type: 'JSXExpressionContainer',
                    expression: {
                        type: 'Literal',
                        value,
                    }
                }
            });
        }
    } else if (propType === componentPropType.number) {
        if (attr) {
            attr.value.expression.value = value;
            attr.value.raw = '\"' + value + '\"';
        } else {
            componentNode.openingElement.attributes.push({
                type: 'JSXAttribute',
                name: {
                    type: 'JSXIdentifier',
                    name: propertyName
                },
                value: {
                    type: 'JSXExpressionContainer',
                    expression: {
                        type: 'Literal',
                        value,
                        raw: '\"' + value + '\"'
                    }
                }
            });
        }
    }
}

/** Retrives the value of a provided react component atrribute value depending on its type */
export function getReactComponentAttributeValue(componentNode: any, propertyName: string, propType: string) {
    if (!componentNode || !componentNode.openingElement) {
        return;
    }

    for (const attribute of componentNode.openingElement.attributes) {
        if (attribute.name.name === propertyName) {
            if (propType === componentPropType.string) {
                return attribute.value.value;
            } else if (propType === componentPropType.boolean) {
                return attribute.value.expression.value;
            } else if (propType === componentPropType.number) {
                return attribute.value.expression.value;
            }
        }
    }
}
