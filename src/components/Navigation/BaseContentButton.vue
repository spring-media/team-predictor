<template lang="html">
  <button class="content-button" :disabled="disabled"> {{content}} </button>
</template>

<script>
export default {
  name: 'content-button',
  props: {
    content: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/base/_mediaqueries.scss';
@import '../../styles/base/_settings.scss';

.content-button {
  position: relative;
  max-width: 95%;
  width: 300px;
  height: 40px;
  margin: 15px 20px;

  border-radius: 4px;
  background-color: rgb(241, 136, 37);
  border: solid 1px rgb(241, 136, 37);

  font-family: 'Mark OT', sans-serif;
  font-size: 14px;
  font-weight: 800;
  text-align: center;
  text-transform: uppercase;
  color: rgb(255, 255, 255);

  transition: all 0.2s ease-in-out;

  @include desktop-and-up() {
    margin: 70px 50px;

    &:hover:not([disabled='disabled']) {
      cursor: pointer;
      color: rgb(241, 136, 37);
      background-color: #ffffff;
      transition: all 0.2s ease-in-out;
    }
  }

  &[disabled='disabled'] {
    opacity: 0.6;
  }
}
</style>
