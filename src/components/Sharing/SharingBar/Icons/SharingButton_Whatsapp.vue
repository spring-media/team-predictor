<template lang="html">
	<span class="sharing-button sharing-button--whatsapp">
		<svg class="icon icon__whatsapp" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
			<path fillRule="evenodd" d="M14.582 11.985c-.25-.124-1.473-.723-1.7-.806-.229-.082-.395-.124-.56.124-.166.248-.643.806-.788.971-.145.165-.29.186-.54.062-.248-.124-1.05-.385-2-1.229-.74-.657-1.24-1.467-1.385-1.715-.145-.248-.015-.382.11-.506.111-.11.248-.289.373-.434.124-.144.166-.247.249-.413.082-.165.041-.31-.021-.433-.062-.124-.56-1.343-.767-1.84-.202-.482-.407-.417-.56-.424a10.028
			10.028 0 0 0-.477-.009.916.916 0 0 0-.664.31c-.228.248-.87.847-.87
			2.066 0 1.219.891 2.396 1.016 2.561.124.166 1.754 2.667 4.25 3.74.594.255 1.057.407 1.419.521.596.189 1.138.162 1.567.098.478-.07 1.472-.599 1.68-1.177.207-.579.207-1.075.144-1.178-.062-.103-.228-.165-.476-.29m-4.54 6.17h-.004a8.295 8.295 0 0 1-4.213-1.148l-.302-.179-3.132.818.836-3.04-.197-.311A8.188 8.188 0 0 1 1.765 9.91c.001-4.541 3.714-8.236 8.28-8.236a8.24 8.24 0 0 1 5.851 2.416 8.168 8.168 0 0 1 2.422 5.827c-.002 4.542-3.714 8.237-8.276 8.237m7.044-15.248A9.918 9.918 0 0 0 10.04 0C4.553 0 .085 4.446.083 9.91c0 1.746.458 3.451 1.33 4.954L0 20l5.279-1.378a9.987 9.987 0 0 0 4.758 1.206h.005c5.488 0 9.955-4.446 9.958-9.91a9.827 9.827 0 0 0-2.914-7.012"/>
		</svg>
	</span>
</template>

<script>
export default {
  name: 'sharing-button-whatsapp',
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

    @include desktop-and-up {
        display: none;

				svg, a {
						display: none;
				}
    }

    .icon {
        stroke: #30b846;
        fill: #30b846;
				/* icon display hack against cropping: */
				padding: 1px;
				margin: -1px;
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
