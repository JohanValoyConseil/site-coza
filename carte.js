/* Carte d'hiver COZA (source : Menus PDF/Menu Hiver.pdf, novembre 2026).
   Pour changer un plat ou un prix : modifier ici, rien d'autre. */
window.COZA = {
  cocktails: {
    spritz:    { name: 'Le Coza Spritz', photo: 'assets/cocktails/spritz.webp', meta: '20 cl · 11,5 %', ing: 'Campari · Ananas · Prosecco · Eau pétillante · Bitter citron', price: 9, free: true, color: '#F0643A' },
    falerno:   { name: 'Le Falerno', photo: 'assets/cocktails/falerno.webp', meta: '16 cl · 15 %', ing: 'Rhum blanc · Citron vert · Hibiscus · Falernum · Ginger beer', price: 9, free: true, color: '#C2304B' },
    smash:     { name: 'Le Smash du Jardin', photo: 'assets/cocktails/smash.webp', meta: '13 cl · 18 %', ing: 'Gin · Citron jaune · Ananas · Basilic', price: 9, free: true, color: '#A8C95A' },
    roco:      { name: 'Le Roco Gin Tonic', photo: 'assets/cocktails/roco.webp', meta: '25 cl · 10 %', ing: 'Gin · Concombre · Rose · Tonic', price: 9, free: true, color: '#F2B8C6' },
    caramel:   { name: 'Le Caramel Espresso Martini', photo: 'assets/cocktails/caramel.webp', meta: '18 cl · 12 %', ing: 'Vodka · Kahlúa · Espresso · Caramel beurre salé', price: 9, color: '#5A3524' },
    amaretto:  { name: "L'Amaretto Sour", photo: 'assets/cocktails/amaretto.webp', meta: '15 cl · 15 %', ing: 'Amaretto · Whisky · Citron · Sirop · Mousse végétale', price: 9, color: '#E7A94B' },
    addict:    { name: 'Le Gin addict', photo: 'assets/cocktails/addict.webp', meta: '26 cl · 9 %', ing: 'Gin · Menthe · Concombre · Ananas · Goyave · Citron · Macaron', price: 11, free: true, color: '#86D3AC' },
    clover:    { name: 'Le Clover Club', photo: 'assets/cocktails/clover.webp', meta: '16 cl · 13,5 %', ing: 'Gin · Vermouth · Citron jaune · Purée de framboise · Mousse', price: 11, color: '#E0507A' },
    ramos:     { name: 'Le Ramos Nebula', photo: 'assets/cocktails/ramos.webp', meta: '30 cl · 8 %', ing: 'Gin · Citrons · Vanille · Crème · Soda Cui-Cui', price: 11, free: true, color: '#EFE6D2' },
    pornstar:  { name: 'Le Pornstar Martini', photo: 'assets/cocktails/pornstar.webp', meta: '22 cl · 10 %', ing: 'Vodka vanille · Passoa · Citron vert · Fruit de la passion · Vanille · Mousse végétale · Shot de Prosecco', price: 11, color: '#F4B740' },
    poivron:   { name: 'Le Poivron', meta: '13,5 cl · 18 %', ing: 'Gin · Mezcal · Citron jaune · Purée de coco · Purée de poivrons · Sésame', price: 11, color: '#F08A4B', photo: 'assets/cocktails/poivron.webp' },
    piko:      { name: 'Le Daiquiri Piko', photo: 'assets/cocktails/piko.webp', meta: '13,5 cl · 18 %', ing: 'Rhum blanc · Liqueur ananas coco · Citron vert · Vergeoise · Sésame', price: 11, color: '#F3DA7A' },
    chartreuse:{ name: 'La Chartreuse', photo: 'assets/cocktails/chartreuse.webp', meta: '20 cl · 12 %', ing: 'Chartreuse · Rhum blanc · Ananas · Falernum · Citron jaune · Mousse', price: 11, color: '#CBD24A' }
  },
  pizzas: [
    { name: 'La Margherita', price: 11, ing: 'Sauce tomate · Mozzarella fior di latte · Parmesan · Basilic', accord: 'roco' },
    { name: "L'Antoinette", price: 14, ing: "Sauce tomate · Mozzarella fior di latte · Champignons de Paris & shiitakes au beurre persillé · Jambon blanc · Éclats d'amandes", accord: 'clover' },
    { name: 'La Piccante', price: 15, ing: 'Sauce tomate · Mozzarella fior di latte · Spianata · Poivrons marinés · Olives · Pignons de pin', accord: 'poivron' },
    { name: 'La Calzone', price: 15, ing: 'Pizza fermée · Sauce tomate · Mozzarella fior di latte · Jambon blanc · Champignons · Parmesan', accord: 'spritz' },
    { name: 'Le Chèvre miel', price: 15, ing: "Crème de ricotta · Mozzarella fior di latte · Chèvre · Compotée d'oignons rouges · Miel · Sésame noir", accord: 'ramos' },
    { name: 'Les 6 fromages', price: 16, ing: 'Crème de ricotta · Mozzarella fior di latte · Fromage à raclette · Parmesan · Taleggio · Stracciatella · Confiture de figues · Éclats de noix', accord: 'amaretto' },
    { name: 'La Crudo', price: 17, ing: "Sauce tomate · Mozzarella fior di latte · Tomates séchées · Jambon cru · Roquette · Stracciatella · Éclats d'amandes · Réduction de balsamique", accord: 'falerno', photo: 'assets/pizzas/crudo.webp', plate: 'assets/pizzas/crudo-rond.webp' },
    { name: 'La Mortadelle', price: 17, ing: 'Pesto · Mozzarella fior di latte · Mortadelle · Stracciatella · Éclats de pistache · Réduction de balsamique', accord: 'smash' },
    { name: 'La Tartufo', price: 17, ing: 'Crème de ricotta à la truffe · Mozzarella fior di latte · Taleggio · Champignons & shiitakes au beurre persillé · Stracciatella à la truffe · Éclats de noisettes · Réduction de vinaigre de cidre', accord: 'piko', photo: 'assets/pizzas/tartufo.webp', plate: 'assets/pizzas/tartufo-rond.webp' },
    { name: 'La Montagnarde', price: 17, ing: "Crème · Mozzarella fior di latte · Pommes de terre · Reblochon · Lardons · Compotée d'oignons rouges", accord: 'chartreuse' },
    { name: 'La Polpo', price: 20, ing: 'Base pesto · Mozzarella fior di latte · Parmesan · Poivrons marinés · Poulpe · Huile verte', accord: 'addict' }
  ],
  pates: [
    { name: 'La mijotée façon bolognaise', price: 15, ing: 'Ragoût de bœuf au vin rouge · Parmesan' },
    { name: 'La carbonara à la Coza', price: 16, ing: "Sauce à l'œuf & à la crème · Lardons & guanciale · Parmesan · Pecorino · Poivre · Stracciatella" },
    { name: 'Le pesto', price: 16, ing: 'Pesto de basilic · Stracciatella · Parmesan' },
    { name: 'La signature Coza', price: 17, ing: 'Poulet · Crème au jus de citron · Stracciatella · Zestes de citron · Parmesan', tag: 'signature' },
    { name: 'Le chorizo', price: 17, ing: 'Sauce tomate · Chorizo · Stracciatella' },
    { name: "L'effilochée de canard", price: 18, ing: 'Effilochée de canard · Champignons · Crème · Parmesan' },
    { name: 'Le poulpe pesto rosso', price: 20, ing: 'Poulpe · Pesto rosso · Poivrons · Perles de balsamique' },
    { name: 'La croziflette', price: 16, ing: 'Crozets · Reblochon · Lardons · Oignons', tag: "plat d'hiver" },
    { name: 'La salade hivernale', price: 15, ing: 'Salade · Magret de canard fumé · Figues · Noix · Oignons confits · Parmesan · Perles de balsamique', tag: 'salade' }
  ],
  entrees: [
    { name: 'Escargots à la Coza', price: 12, ing: '12 escargots · Beurre maison' },
    { name: 'Carpaccio de bœuf', price: 10, ing: 'Bœuf tranché finement et ses condiments · Roquette · Parmesan' },
    { name: 'Saumon gravlax', price: 10, ing: 'Purée de passion · Perles de citron · Aneth' },
    { name: 'Caldo Tomato', price: 8, ing: 'Soupe de tomate · Basilic · Croûtons' },
    { name: 'Assiette de charcuterie', price: 14, ing: 'À partager' },
    { name: 'Assiette de fromages', price: 14, ing: 'À partager' },
    { name: 'Assiette mixte 2 personnes', price: 15, ing: 'Charcuterie & fromages' },
    { name: 'Assiette mixte 4 personnes', price: 26, ing: 'Charcuterie & fromages' }
  ],
  desserts: [
    { name: 'Tiramisu café spéculoos', price: 9, ing: 'Le tiramisu de la maison', tag: 'maison' },
    { name: 'Crème brûlée à la cannelle', price: 8, ing: '' },
    { name: 'Mousse au chocolat', price: 8, ing: 'Éclats de chocolat blanc' },
    { name: 'Panna cotta et son coulis', price: 7, ing: 'Coulis de yuzu ou myrtille' },
    { name: 'Café gourmand', price: 9, ing: 'Expresso et notre sélection de desserts du moment' },
    { name: 'Cocktail gourmand', price: 13, ing: 'Caramel espresso martini, Irish coffee ou London tea, et nos desserts du moment' },
    { name: 'Le trou glacé', price: 7, ing: "L'alcool et la glace de votre choix : pistache & limoncello, café & Baileys, citron & Chartreuse jaune…" },
    { name: 'Glaces Antica', price: '2,5 · 4 · 5', ing: '1, 2 ou 3 boules · Vanille · Chocolat · Fraise · Pistache · Noisette · Caramel beurre salé · Stracciatella · Café · Citron de Sicile' }
  ],
  foot: {
    pizzas: "+ 2 € par ingrédient supplémentaire (burrata, viande et truffe + 3 €). Accompagnée d'une salade + 2 €.",
    cocktails: 'Les créations marquées « sans alcool possible » peuvent être adaptées sans alcool.',
    pates: 'Toutes nos recettes en pâtes ou en gnocchis. Pâtes disponibles sans gluten.',
    entrees: 'Pizza à partager : voir le prix des pizzas.',
    desserts: "Menu enfant 12 € (jusqu'à 12 ans) : sirop à l'eau, pizza ou pâtes, une boule de glace."
  }
};
