export default {
    state: {
        rules: {
            sumInv: {
                min: 100,
                max: 200000,
                errorMin: 'Минимальная сумма инвестиции: <span class="error-message__value">$ 100</span>',
                errorMax: 'Максимальная сумма инвестиции: <span class="error-message__value">$ 200 000</span>',
            },
            mult: {
                min: 1,
                max: 40,
                error: 'Неверное значение мультипликатора',
            },
            takeProfit: {
                min: 0.1
            },
            stopLoss: {
                max: 1
            },
        }
    },
    getters: {

    },
    mutations: {

    },
    actions: {
        sendForm({state, commit}, payload) {

            let valid = true;

            if(payload.data.sumInv < state.rules.sumInv.min) {
                valid = false;
                commit("sumInvError", state.rules.sumInv.errorMin);
            }
            if(payload.data.sumInv > state.rules.sumInv.max) {
                valid = false;
                commit("sumInvError", state.rules.sumInv.errorMax);
            }

            if(payload.data.mult < state.rules.mult.min || payload.data.mult > state.rules.mult.max) {
                valid = false;
                commit("multError", state.rules.mult.error);
            }

            let unit = payload.unit;
            if(payload.data.takeProfit) {
                let min = payload.data.sumInv * state.rules.takeProfit.min;
                if(payload.data.takeProfit < min) {
                    valid = false;
                    if(unit === "dollar") {
                        commit("takeProfitError", "Не может быть меньше $ " + min);
                    } else {
                        commit("takeProfitError", "Не может быть меньше 10%");
                    }
                }
            }

            if(payload.data.stopLoss) {
                let max = payload.data.sumInv * state.rules.stopLoss.max;
                if(payload.data.stopLoss > max) {
                    valid = false;
                    if(unit === "dollar") {
                        commit("stopLossError", "Не может быть больше $ " + max);
                    } else {
                        commit("stopLossError", "Не может быть больше 100%");
                    }
                }
            }

            if(valid) {

                let fetchUrl = "";
                let fetchOptions = {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                    },
                };

                console.log(payload.data);
                /*let fetchInvestForm = fetch(fetchUrl, fetchOptions);
                fetchInvestForm.then(function(response){
                    response.json().then(function (d) {
                        if (response.status === 200) {
                            alert('Данные отправлены');
                            console.log(d);
                        } else {
                            alert('Error');
                        }
                    });
                });*/
            }

        }

    }
}