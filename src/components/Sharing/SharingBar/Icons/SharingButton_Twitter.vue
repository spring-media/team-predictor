<template lang="html">
	<span class="sharing-button sharing-button--twitter">
		<svg class="icon icon__twitter" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 18 15" xmlSpace="preserve">
			<g id="Symbols">
				<g id="HEADER-STICKY_variante_neu" transform="translate(-1205.000000, -13.000000)">
					<g id="HEADER-STICKY-Copy">
						<g id="share-icons" transform="translate(1175.000000, 9.000000)">
							<path id="twitter-icon" class="st0" d="M47.5,4.3C46.8,4.7,46,5,45.2,5.2C44.5,4.5,43.5,4,42.5,4c-2,0-3.7,1.7-3.7,3.7c0,0.3,0,0.6,0.1,0.8c-3.1-0.2-5.8-1.6-7.6-3.9c-0.3,0.6-0.5,1.2-0.5,1.9c0,1.3,0.7,2.4,1.6,3.1c-0.6,0-1.2-0.2-1.7-0.5v0c0,1.8,1.3,3.3,3,3.6C33.4,13,33,13,32.7,13c-0.2,0-0.5,0-0.7-0.1c0.5,1.5,1.8,2.6,3.4,2.6c-1.3,1-2.9,1.6-4.6,1.6c-0.3,0-0.6,0-0.9-0.1c1.6,1.1,3.6,1.7,5.7,1.7c6.8,0,10.5-5.7,10.5-10.6c0-0.2,0-0.3,0-0.5c0.7-0.5,1.3-1.2,1.8-1.9c-0.7,0.3-1.4,0.5-2.1,0.6C46.6,5.9,47.2,5.1,47.5,4.3"/>
						</g>
					</g>
				</g>
			</g>
		</svg>
	   </span>
</template>

<script>
export default {
  name: 'sharing-button-twitter'
};
</script>

<style lang="scss" >
@import '../../../../styles/base/_mediaqueries.scss';
@import '../../../../styles/base/_settings.scss';
@import '../../../../styles/base/_icons.scss';

.sharing-button--twitter {
  display: block;

  svg,
  a {
    display: block;
  }

  .icon {
    stroke: #1da1f3;
    fill: #1da1f3;

    transition: all 0.2s ease-out;

    @include desktop-and-up {
      &:hover {
        stroke: #f18825 !important;
        fill: #f18825 !important;
      }
    }
  }
}
</style>
