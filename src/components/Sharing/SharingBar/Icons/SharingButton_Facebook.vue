<template lang="html">
	<span class="sharing-button sharing-button--facebook">
		<svg class="icon icon__facebook" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 11 20" xmlSpace="preserve">
			<g id="Symbols">
				<g id="HEADER-STICKY_variante_neu" transform="translate(-1175.000000, -10.000000)">
					<g id="HEADER-STICKY-Copy">
						<g id="share-icons" transform="translate(1175.000000, 9.000000)">
							<path id="facebook-icon" class="st0" d="M7.8,4.5C7.4,4.5,7,5,7,5.6v2.3h3.9v3.3H7V21H3.3v-9.8H0V7.9h3.3V6c0-2.8,1.9-5,4.5-5h3.1v3.5H7.8"/>
						</g>
					</g>
				</g>
			</g>
		</svg>
	   </span>
</template>

<script>
export default {
  name: 'sharing-button-facebook',
};
</script>

<style lang="scss" scoped>
@import '../../../../styles/base/_mediaqueries.scss';
@import '../../../../styles/base/_settings.scss';
@import '../../../../styles/base/_icons.scss';

.sharing-button {
    display: block;

		svg, a {
				display: block;
		}

    .icon {
        fill: #4267b2;
        stroke: #4267b2;

        transition: all 0.2s ease-out;

        @include desktop-and-up {
					&:hover {
	            stroke: #f18825 !important;
	            fill: #f18825!important;
	        }
	    }
   }
}
</style>
