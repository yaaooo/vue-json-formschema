import { inputName, argName } from '@/lib/components'
import FormSchemaInputArrayElement from './FormSchemaInputArrayElement'
import { assign } from '@/lib/object'

const unwrappingElements = ['checkbox', 'radio']

export const INPUT_ADDED_EVENT = 'input-added'

export default {
  functional: true,
  render (createElement, { props, slots, listeners }) {
    const { field, value, input, disableWrappingLabel, components } = props
    const children = slots().default || []

    if (field.isArrayField && field.attrs.type !== 'select') {
      const name = field.attrs.name
      const data = {
        props: { name, field, value, input, components },
        on: listeners
      }

      if (unwrappingElements.includes(field.attrs.type)) {
        assign(data.props, input.data.field.attrs)

        return createElement(components.$.inputwrapper.component, data, [
          createElement(FormSchemaInputArrayElement, data, children)
        ])
      }

      const inputs = Array.apply(null, Array(field.itemsNum)).map((v, i) => {
        data.props.name = inputName(field, i)
        input.data.attrs['data-fs-index'] = i

        return createElement(FormSchemaInputArrayElement, data, children)
      })

      const button = components.$.arraybutton
      const buttonData = {
        [argName(button)]: {
          disabled: field.maxItems <= field.itemsNum
        },
        on: {
          click () {
            if (field.itemsNum < field.maxItems) {
              field.itemsNum++

              if (INPUT_ADDED_EVENT in listeners) {
                listeners[INPUT_ADDED_EVENT]()
              }
            }
          }
        }
      }

      inputs.push(createElement(button.component, buttonData))

      return createElement(components.$.inputwrapper.component, {
        props: { field, components }
      }, [
        createElement(components.$.inputswrapper.component, {
          props: { field, components }
        }, inputs)
      ])
    }

    const nodes = [
      createElement(input.element.component, input.data, children)
    ]

    if (disableWrappingLabel) {
      return nodes
    }

    return createElement(components.$.inputwrapper.component, {
      props: { field, components }
    }, nodes)
  }
}
