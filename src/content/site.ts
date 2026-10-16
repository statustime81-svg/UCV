export type Lang = "de" | "en";

// Order: German title, English title, German description, English description.
type BilingualItem = [string, string, string, string];

export const pick = (l: Lang, de: string, en: string): string =>
  l === "de" ? de : en;

export const url = (l: Lang, path = ""): string =>
  `${l === "en" ? "/en" : ""}/${path}`;

export const contact = {
  email: "partners@urbanculinaryventure.de",
  whatsapp: "https://wa.me/4915219583294",
  phone: "+49 152 19583294",
  phoneHref: "tel:+4915219583294",
  location: "Berlin, Germany",
};

export const support: BilingualItem[] = [
  [
    "Marke & Menü",
    "Brand & menu",
    "Markenentwicklung und -betreuung, eine klare Menüstruktur und gemeinsam abgestimmte Preise.",
    "Brand development and management, a clear menu structure, and agreed pricing.",
  ],
  [
    "Lieferplattformen",
    "Delivery platforms",
    "Vereinbartes Plattform-Onboarding und laufende Verwaltung der Markenauftritte. Die verfügbaren Plattformen hängen vom Standort und den jeweiligen Freigaben ab.",
    "Agreed platform onboarding and ongoing management of brand listings. Platform availability depends on the location and the relevant approvals.",
  ],
  [
    "Team-Training",
    "Team training",
    "Vorbereitung deines Teams auf das vereinbarte Menü, die Zubereitung, die Verpackung und den Bestellablauf. Umfang und Organisation stimmen wir auf deinen Betrieb ab.",
    "Preparation of your team for the agreed menu, food preparation, packaging, and order workflow. The scope and organisation are tailored to your restaurant.",
  ],
  [
    "Marketing",
    "Marketing",
    "Produktpräsentation und Koordination der vereinbarten Marketingmaßnahmen. Werbebudgets, Rabattaktionen und Kostenverteilung werden vor der Umsetzung abgestimmt.",
    "Product presentation and coordination of agreed marketing activities. Advertising budgets, promotions, and cost allocation are agreed before implementation.",
  ],
  [
    "Verpackung",
    "Packaging",
    "Vorgaben und Schulung für eine einheitliche Verpackungsqualität. Bestellung, Bezugsquellen und Kostenverteilung werden im Onboarding vereinbart.",
    "Guidance and training for consistent packaging quality. Ordering responsibilities, suppliers, and cost allocation are agreed during onboarding.",
  ],
  [
    "Persönlicher Support",
    "Personal support",
    "Persönlicher Austausch, laufende operative Abstimmung und WhatsApp-Support im vereinbarten Rahmen.",
    "Personal communication, ongoing operational coordination, and WhatsApp support within the agreed scope.",
  ],
];

export const steps: BilingualItem[] = [
  [
    "Restaurant vorstellen",
    "Introduce your restaurant",
    "Erzähl uns von deinem Restaurant, dem Standort und deiner Küche. Gemeinsam besprechen wir, welche UCV-Marke dich interessiert und welche Kapazitäten verfügbar sind.",
    "Tell us about your restaurant, location, and kitchen. Together, we discuss which UCV brand interests you and the capacity available.",
  ],
  [
    "Gemeinsam prüfen",
    "Find the right fit",
    "Wir prüfen gemeinsam Ausstattung, Lagerkapazitäten, Arbeitsflächen, verfügbare Mitarbeitende und Lieferabläufe. So beurteilen wir, welches Konzept zu deinem Betrieb und Standort passt.",
    "Together, we assess equipment, storage capacity, preparation space, staffing, and delivery arrangements to identify a concept that suits your operation and location.",
  ],
  [
    "Start vorbereiten",
    "Prepare to launch",
    "Vor Vertragsabschluss klären wir Konditionen, Aufgaben und Kosten. Anschließend stimmen wir das Launch-Menü ab, bereiten dein Team vor und organisieren das vereinbarte Plattform-Onboarding.",
    "Before signing, we clarify commercial terms, responsibilities, and costs. We then agree on the launch menu, prepare your team, and organise the agreed platform onboarding.",
  ],
  [
    "Gemeinsam loslegen",
    "Launch together",
    "Nach den erforderlichen Vorbereitungen und Freigaben startet das zusätzliche Lieferangebot. Dein Team bereitet die Bestellungen zu. UCV übernimmt die vereinbarte Markenbetreuung, Plattformverwaltung und Unterstützung.",
    "Once the necessary preparations and approvals are complete, the additional delivery offering launches. Your team prepares the orders. UCV provides the agreed brand management, platform management, and support.",
  ],
];

export const faqs: BilingualItem[] = [
  [
    "Brauche ich ein neues Restaurant?",
    "Do I need a new restaurant?",
    "Nein. Unser Partnerschaftsmodell richtet sich an bestehende Restaurants mit einer geeigneten Küche. Gemeinsam prüfen wir, ob Ausstattung, Team und Kapazitäten zum gewünschten Konzept passen.",
    "No. Our partnership model is designed for existing restaurants with a suitable kitchen. Together, we assess whether your equipment, team, and capacity fit the concept.",
  ],
  [
    "Kann ich meinen Restaurantnamen und mein bestehendes Menü behalten?",
    "Can I keep my restaurant name and existing menu?",
    "Ja. Dein bestehendes Restaurant und dein bisheriges Angebot können weitergeführt werden. Das zusätzliche Lieferangebot wird unter der vereinbarten UCV-Marke aufgebaut.",
    "Yes. You can continue operating your existing restaurant and menu. The additional delivery offering is developed under the agreed UCV brand.",
  ],
  [
    "Muss ich beide Marken anbieten?",
    "Do I need to offer both brands?",
    "Nein. Wir prüfen gemeinsam, ob Fry Rebels, Fresh Crust Pizza oder gegebenenfalls beide Konzepte zu deinem Betrieb passen.",
    "No. Together, we assess whether Fry Rebels, Fresh Crust Pizza, or potentially both concepts fit your operation.",
  ],
  [
    "Gibt es eine Einstiegsgebühr?",
    "Is there a joining fee?",
    "Nein, UCV erhebt keine Einstiegsgebühr. Kosten für den laufenden Betrieb und gegebenenfalls notwendige Anpassungen werden vor dem Start transparent besprochen.",
    "No. UCV does not charge a joining fee. Operating costs and any necessary adjustments are discussed transparently before launch.",
  ],
  [
    "Welche Ausstattung brauche ich?",
    "What equipment do I need?",
    "Das hängt von der gewählten Marke und dem vereinbarten Menü ab. Wir prüfen deine vorhandene Ausstattung und klären vor Vertragsabschluss, ob Ergänzungen erforderlich sind.",
    "This depends on the selected brand and agreed menu. We assess your existing equipment and explain any additions needed before you sign.",
  ],
  [
    "Wer kauft Zutaten und Verpackungen?",
    "Who purchases ingredients and packaging?",
    "Bezugsquellen, Produktspezifikationen, Bestellung und Kostenverteilung werden im Onboarding vereinbart. UCV unterstützt mit Vorgaben für eine einheitliche Produkt- und Verpackungsqualität.",
    "Suppliers, product specifications, ordering responsibilities, and cost allocation are agreed during onboarding. UCV provides guidance for consistent product and packaging quality.",
  ],
  [
    "Wer verwaltet die Lieferplattformen?",
    "Who manages the delivery platforms?",
    "UCV übernimmt das vereinbarte Plattform-Onboarding und die laufende Verwaltung der Markenauftritte. Welche Plattformen genutzt werden können, hängt vom Standort und der jeweiligen Freigabe ab.",
    "UCV handles the agreed platform onboarding and ongoing management of brand listings. Platform availability depends on the location and the relevant approvals.",
  ],
  [
    "Wer liefert die Bestellungen?",
    "Who delivers the orders?",
    "Je nach Standort und Vereinbarung erfolgt die Lieferung durch die Fahrer des Restaurantpartners oder durch verfügbare Plattform-Lieferdienste. Die passende Lösung und die Kosten werden vor dem Start geklärt.",
    "Depending on the location and agreement, orders are delivered by the restaurant partner’s drivers or available platform delivery services. The arrangement and costs are agreed before launch.",
  ],
  [
    "Wer bezahlt Werbung und Rabattaktionen?",
    "Who pays for advertising and discounts?",
    "UCV koordiniert die vereinbarten Marketingmaßnahmen. Werbebudget, Rabattaktionen und die jeweilige Kostenverteilung werden vor ihrer Umsetzung abgestimmt.",
    "UCV coordinates the agreed marketing activities. Advertising budgets, promotions, and cost allocation are agreed before implementation.",
  ],
  [
    "Wie werde ich bezahlt?",
    "How will I be paid?",
    "Die Partnerabrechnung erfolgt alle zwei Wochen auf Basis der vereinbarten Umsatzbeteiligung. Die Berechnungsgrundlage sowie die Behandlung von Rabatten, Stornierungen, Erstattungen und sonstigen vereinbarten Abzügen werden vor dem Start erläutert.",
    "Partner settlements take place every two weeks based on the agreed revenue share. The calculation basis and treatment of discounts, cancellations, refunds, and other agreed deductions are explained before launch.",
  ],
  [
    "Wie läuft die Schulung ab?",
    "How does training work?",
    "Vor dem Launch bereiten wir dein Team auf das vereinbarte Menü, die Zubereitung, die Verpackung und den Bestellablauf vor. Umfang und Organisation der Schulung richten sich nach dem Betrieb und der ausgewählten Marke.",
    "Before launch, we prepare your team for the agreed menu, food preparation, packaging, and order workflow. The scope and organisation of training depend on the restaurant and selected brand.",
  ],
  [
    "Wie schnell können wir starten?",
    "How quickly can we launch?",
    "Der Starttermin hängt von der Kücheneignung, vollständigen Unterlagen, Mitarbeiterschulung und Freigaben der Lieferplattformen ab. Nach der ersten Prüfung stimmen wir einen realistischen Ablauf mit dir ab.",
    "The launch date depends on kitchen suitability, complete documentation, staff training, and delivery-platform approvals. Following the initial assessment, we agree on a realistic schedule.",
  ],
  [
    "Kann ich mich außerhalb Berlins bewerben?",
    "Can I apply from outside Berlin?",
    "Ja. UCV ist in Berlin ansässig und nimmt auch Anfragen aus anderen deutschen Städten entgegen. Ob eine Zusammenarbeit möglich ist, prüfen wir anhand des Standorts, der Küche und unserer Betreuungsmöglichkeiten.",
    "Yes. UCV is based in Berlin and also welcomes enquiries from other German cities. We assess each opportunity based on the location, kitchen, and our ability to support it.",
  ],
  [
    "Wie lange läuft der Vertrag und wie kann ich kündigen?",
    "What is the contract duration, and how can I terminate it?",
    "Vertragslaufzeit und Kündigungsbedingungen werden vor Vertragsabschluss schriftlich erläutert. Mit einer unverbindlichen Anfrage gehst du noch keine Partnerschaft ein.",
    "The contract duration and termination conditions are explained in writing before signing. Sending an enquiry does not commit you to a partnership.",
  ],
  [
    "Ist ein bestimmter Umsatz garantiert?",
    "Is a particular level of sales guaranteed?",
    "Nein. Die Nachfrage hängt unter anderem von Standort, Wettbewerb, Öffnungszeiten, Produktqualität und Lieferbedingungen ab. Wir geben keine pauschalen Umsatz- oder Gewinnversprechen.",
    "No. Demand depends on factors including location, competition, opening hours, product quality, and delivery conditions. We do not guarantee sales or profits.",
  ],
];
