<template>
    <div class="mainLayout">
        <div class="center-block">
            <InvestForm  />
        </div>
    </div>
</template>

<script>
    import InvestForm from "../../components/InvestForm/InvestForm";

    export default {
        name: "MainLayout",
        components: {
            InvestForm
        },
    }

</script>
<style src="./MainLayout.css" >

</style>