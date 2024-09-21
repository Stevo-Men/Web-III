export default class FactTemplate {
    static facts(facts) {
        let html = "";
        for (const fact of filteredResults) {
            html += FactTemplate.fact(fact);
        }
        return html;
    }



    static fact(fact) {
        return `
                <div class="fact">
                    <q>${fact.value}</q>
                </div>
            `;
    }
}
