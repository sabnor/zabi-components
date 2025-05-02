<script>
  import ExampleComponent from '../src/components/ExampleComponent.svelte';

  export default {
    title: 'ExampleComponent',
    component: ExampleComponent,
  };

  const Template = (args) => ({
    Component: ExampleComponent,
    props: args,
  });

  export const Default = Template.bind({});
  Default.args = {
    // Add default props for the ExampleComponent here
  };

  export const VariationOne = Template.bind({});
  VariationOne.args = {
    // Add props for a variation of the ExampleComponent here
  };

  export const VariationTwo = Template.bind({});
  VariationTwo.args = {
    // Add props for another variation of the ExampleComponent here
  };
</script>