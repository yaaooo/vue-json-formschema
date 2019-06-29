import { FieldsetElement } from '@/components/FieldsetElement';
import { ArrayButton } from '@/components/ArrayButton';
import { ArrayComponent } from '@/types';

export const ArrayElement: ArrayComponent = {
  name: 'ArrayElement',
  functional: true,
  render(h, { data, props }) {
    const nodes = props.field.getFields().map((field) => h(field.component, {
      attrs: {
        ...field.attrs.input,
        value: field.model
      },
      props: {
        ...props,
        field: field,
        value: field.model
      }
    }));

    nodes.push(h(ArrayButton, data));

    return h(FieldsetElement, data, nodes);
  }
};
