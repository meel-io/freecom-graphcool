<template>
    <div v-bind:class="buttonStyles" v-on:click="togglePanel">
        <i class='material-icons'>{{this.isOpen ? 'close' : 'chat_bubble'}}</i>
    </div>
</template>

<script>
export default {
  data: {
    isOpen: false
  },
  computed: {
    buttonStyles: function() {
      return cx("button drop-shadow-hover pointer flex-center flex", {
        "drop-shadow-hover-active": this.isOpen
      })
    }
  },
  methods: {
    togglePanel: function() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>