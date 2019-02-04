<template lang="html">
  <footer class="mainfooter" id="ia-wm-kader-mainfooter">
      <div class="mainfooter__linkList">
          <a class="mainfooter__links" rel="noopener noreferrer" target="_blank" href="https://www.welt.de/services/article175800209/DEIN-WM-KADER-Impressum.html" > Impressum </a>
          <a class="mainfooter__links" rel="noopener noreferrer" target="_blank" href="https://www.welt.de/services/article157550705/Datenschutzerklaerung-WELT-DIGITAL.html"> Datenschutz </a>
          <a class="mainfooter__links" rel="noopener noreferrer" target="_blank" href="https://www.welt.de/services/article122129231/Nutzungsbedingungen-WELT-Digital.html"> AGB </a>
      </div>
      <span class="mainfooter__content"> © Axel Springer SE </span>
  </footer>
</template>

<script>
export default {
  name: 'the-footer'
};
</script>

<style lang="scss" scoped>
@import '../../styles/base/_mediaqueries.scss';
@import '../../styles/base/_settings.scss';
@import '../../styles/base/_mixins.scss';

.mainfooter {
  margin-top: 50px;
  height: 90px;
  background-color: $welt;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.25);

  display: flex;
  align-items: center;
  flex-direction: column;

  @include tablet-landscape-only() {
    height: 67px;
  }

  @include desktop-and-up() {
    height: 67px;
  }

  &__linkList {
    margin-top: 12px;

    @include tablet-landscape-only() {
      margin-top: 11px;
    }

    @include desktop-and-up() {
      margin-top: 11px;
    }
  }

  &__links {
    text-decoration: none;
    color: #ffffff;
    text-transform: uppercase;
    padding: 0 15px 8px;
    @include MarkOt;
    font-weight: 800;
    font-size: 11px;
    letter-spacing: 0.4px;

    @include tablet-landscape-only() {
      font-size: 11px;
      padding: 0 10px 8px;
    }

    @include desktop-and-up() {
      font-size: 11px;
      padding: 0 10px 8px;
    }
  }

  &__content {
    width: 252px;
    @include MarkOt;
    font-weight: 300;
    font-size: 14px;
    letter-spacing: 0.4px;
    text-align: center;
    color: #ffffff;
    margin: 8px auto 0;

    @include tablet-landscape-only() {
      width: 382px;
      margin-top: 5px;
    }

    @include desktop-and-up() {
      width: 382px;
      margin-top: 5px;
    }
  }
}
</style>
