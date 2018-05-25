export function translate(_key: string | string[], _args?: string[] | string) {
    let key: string, args: string[] = [];

    if (typeof _key === 'string') {
        key = _key;
    } else {
        key = _key[0];
        args = args.concat(_key.slice(1));
    }

    if (_args) {
        if (Array.isArray(_args)) {
            args = args.concat(_args);
        } else {
            args.push(_args);
        }
    }

    let translated: string | undefined = undefined;
    if ((window as any).translations) {
        translated = (window as any).translations[key];
    }
    
    if (translated === undefined) {
        console.warn('No translation defined for "%s"', key);
        translated = key;
    } else {
        for (var i = 0; i < args.length; i++) {
            let position = translated.indexOf('{}');
            if (position < 0) {
                break;
            }

            translated = translated.substring(0, position) + args[i] + translated.substring(position + 2);
        }
    }

    return translated;
}