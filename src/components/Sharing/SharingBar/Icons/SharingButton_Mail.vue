<template lang="html">
	<span class="sharing-button sharing-button--mail">
		<svg class="icon icon__mail" version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 16" xmlSpace="preserve">
			<g id="Symbols">
				<g id="HEADER-STICKY_variante_neu" transform="translate(-1242.000000, -12.000000)">
					<g id="HEADER-STICKY-Copy">
						<g id="share-icons" transform="translate(1175.000000, 9.000000)">
							<g id="mail2" transform="translate(67.000000, 3.000000)">
								<path id="Shape" stroke-width=".3" class="st0" d="M18.2,15.9c0.8,0,1.5-0.7,1.5-1.5V1.9c0-0.8-0.7-1.5-1.5-1.5H2.2C1.3,0.3,0.6,1,0.6,1.9v12.6c0,0.8,0.7,1.5,1.5,1.5H18.2z M2.3,2h15.8v12.3H2.3V2z M10.2,9.9c0.4,0,0.8-0.2,1-0.4l5.9-5.2l-1.1-1.2l-5.9,5.2c0,0,0.2,0.1-5.9-5.2L3.2,4.3l5.9,5.2C9.4,9.7,9.8,9.9,10.2,9.9L10.2,9.9z"/>
							</g>
						</g>
					</g>
				</g>
			</g>
		</svg>
	</span>
</template>

<script>
export default {
  name: 'sharing-button-mail',
};
</script>

<style lang="scss" scoped>
@import '../../../../styles/base/_mediaqueries.scss';
@import '../../../../styles/base/_settings.scss';
@import '../../../../styles/base/_icons.scss';

.sharing-button {
    display: none;

		svg, a {
				display: none;
		}

    @include desktop-and-up {
        display: block;

				svg, a {
						display: block;
				}
    }

    .icon {
        fill: #003a5a;
        stroke: #003a5a;

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
