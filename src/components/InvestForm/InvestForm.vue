<template>
    <div class="invest-now">
        <div class="invest-now__header">
            <p class="invest-now__title">Инвестировать сейчас</p>
        </div>
        <form class="invest-form" id="invest-form">
            <div class="invest-form__fields">
                <InvestSum />
                <LimitBlock />
            </div>
        <Buttons />
        </form>
    </div>
</template>

<script>
    import InvestSum from "./InvestSum/InvestSum";
    import LimitBlock from "./LimitsBlock/LimitsBlock";
    import Buttons from "./Buttons/Buttons";

    export default {
        name: "InvestForm",
        components: {
            InvestSum, LimitBlock, Buttons
        },
    }

</script>
<style src="./style.css" >

</style>