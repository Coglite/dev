import { WithStyles } from "material-ui"
import { IReactComponent, inject, observer } from "mobx-react"
import * as React from "react"
import injectSheet from "react-jss"
import { StoreRoot } from "../../stores/storeRoot"
import { cogStore } from "../../stores"

/**
 * @param wrappedComponent {IReactComponent} The base component to be wrapped
 * @param styles {style} The styles to be injected
 * @param dynamicStyling {boolean} If the styles needs to be updated dynamically on store updates
 */

export const cogWrap = (
  wrappedComponent: IReactComponent<any>,
  styles?: any,
  dynamicStyling: boolean = false,
) => {
  if (styles) {
    const StyledComponent = injectSheet(styles)(observer(wrappedComponent))
    if (dynamicStyling) {
      const Wrapper = props => {
        return <StyledComponent {...props} {...props.store.uiStore} />
      }
      return inject(cogStore)(observer(Wrapper))
    } else {
      return inject("store")(StyledComponent)
    }
  } else {
    return inject("store")(observer(wrappedComponent))
  }
}

export interface IStoreProps {
  store?: StoreRoot
}

export interface IStyledProps extends IStoreProps, WithStyles<any> {}
