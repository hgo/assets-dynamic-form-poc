<template>
  <div id="app">
    <div class="grid padded gutters">
      <div class="row">
        <div class="column">
          <div>SCHEMA</div>
          <v-jsoneditor v-model="schema" :options="{mode: 'code'}" :plus="false" height="400px" @error="onEditorError"/>
        </div>
        <div class="column">
          <div>UI SCHEMA</div>
          <v-jsoneditor v-model="uischema" :options="{mode: 'code'}" :plus="false" height="400px" @error="onEditorError"/>
        </div>
        <div class="column">
          <div>DATA</div>
          <v-jsoneditor v-model="data" :options="{mode: 'code'}" :plus="false" height="400px" @error="onEditorError"/>
        </div>
      </div>
      <div class="row">
        <div class="column"></div>
        <div class="column"></div>
      </div>
      <div class="row">
        <div class="column"></div>
      </div>
    </div>

    <div class="myform">
      <json-forms
        v-bind:data="data"
        v-bind:renderers="renderers"
        v-bind:schema="schema"
        v-bind:uischema="uischema"
        @change="onChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { JsonForms, JsonFormsChangeEvent } from "@jsonforms/vue2";
import {
  defaultStyles,
  mergeStyles,
  vanillaRenderers
} from "@jsonforms/vue2-vanilla";

// mergeStyles combines all classes from both styles definitions
const myStyles = mergeStyles(defaultStyles, { control: { label: "mylabel" } });

const renderers = [
  ...vanillaRenderers
  // here you can add custom renderers
];

const schema = {
  properties: {
    name: {
      type: "string",
      minLength: 1,
      description: "The task's name"
    },
    description: {
      title: "Long Description",
      type: "string"
    },
    done: {
      type: "boolean"
    },
    dueDate: {
      type: "string",
      format: "date",
      description: "The task's due date"
    },
    rating: {
      type: "integer",
      maximum: 5
    },
    recurrence: {
      type: "string",
      enum: ["Never", "Daily", "Weekly", "Monthly"]
    },
    recurrenceInterval: {
      type: "integer",
      description: "Amount of days until recurrence"
    }
  }
};

const uischema = {
  type: "HorizontalLayout",
  elements: [
    {
      type: "VerticalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/name"
        },
        {
          type: "Control",
          scope: "#/properties/description",
          options: {
            multi: true
          }
        },
        {
          type: "Control",
          scope: "#/properties/done"
        }
      ]
    },
    {
      type: "VerticalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/dueDate"
        },
        {
          type: "Control",
          scope: "#/properties/rating"
        },
        {
          type: "Control",
          scope: "#/properties/recurrence"
        },
        {
          type: "Control",
          scope: "#/properties/recurrenceInterval"
        }
      ]
    }
  ]
};

export default defineComponent({
  name: "App",
  components: {
    JsonForms
  },
  data() {
    return {
      // freeze renderers for performance gains
      renderers: Object.freeze(renderers),
      data: {},
      schema,
      uischema
    };
  },
  methods: {
    onEditorError(e: any) {
      // console.log(e);
    },
    onChange(event: JsonFormsChangeEvent) {
      this.data = event.data;
    }
  },
  provide() {
    return {
      styles: myStyles
    };
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  margin-left: 120px;
  margin-right: 120px;
  /*display: flex;*/
  /*flex-direction: column;*/
  /*align-items: center;*/
}

.logo {
  flex: 0 1 auto;
}

.mylabel {
  color: darkslategrey;
}

.vertical-layout {
  margin-left: 10px;
  margin-right: 10px;
}

.myform {
  width: 640px;
  margin: 0 auto;
}

.text-area {
  min-height: 80px;
}

.control > .wrapper > input[type="checkbox"] {
  flex: 0;
}
</style>
