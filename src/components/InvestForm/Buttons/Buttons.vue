<template>
    <div class="invest-form__buttons">
        <div class="invest-form__left-col">
            <div class="invest-form__btn invest-form__btn_reduction" data-val="reduction" @click="sendForm">
                <span class="invest-form__btn-icon invest-form__btn-icon_reduction" />
                <span class="invest-form__btn-text">В снижение</span>
            </div>
        </div>
        <div class="invest-form__right-col">
            <div class="invest-form__btn invest-form__btn_growth" data-val="growth" @click="sendForm">
                <span class="invest-form__btn-icon invest-form__btn-icon_growth" />
                <span class="invest-form__btn-text">В рост</span>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        name: "LimitsBlock",

        computed: {

        },
        methods: {

            sendForm(e) {

                let payload = {
                    data: {
                        sumInv: Number(this.$store.getters.fieldVal.replace(/[^0-9+]/g, '')),
                        mult: Number(this.$store.getters.multVal.replace(/[^0-9+]/g, '')),
                        direction: e.currentTarget.dataset.val
                    },
                    unit: this.$store.getters.takeProfitField.unit
                };

                if(this.$store.getters.takeProfitField.value) {
                    payload.data.takeProfit = Number(this.$store.getters.takeProfitField.value.replace(/[^0-9+]/g, ''));
                }
                if(this.$store.getters.stopLossField.value) {
                    payload.data.stopLoss = Number(this.$store.getters.stopLossField.value.replace(/[^0-9+]/g, ''));
                }
                this.$store.dispatch("sendForm", payload);

            }

        },
        mounted: function() {



        }
    }

</script>
<style src="./style.css" >

</style>