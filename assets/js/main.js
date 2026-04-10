/* =============================================================
   PORTFOLIO SCRIPT OVERVIEW
   ─────────────────────────
   Features
     1. Translations (I18N) — multi-language text via [data-i18n]
     2. Language Switcher   — persisted to localStorage
     3. Reveal Animations   — char/line/image entrance effects
     4. Keyhole Scroll      — clip-path "window" on project pages
     5. Preloader           — poster + counter intro (homepage)
     6. Bootstrap           — DOMContentLoaded entry point

   Dependencies (all optional CDN)
     • GSAP 3 core          — animations
     • GSAP Flip            — preloader poster morph
     • GSAP SplitText       — text-reveal masks
     • GSAP ScrollTrigger   — scroll-driven keyhole + reveals

   Fallback behaviour
     If any GSAP library fails to load the site remains fully
     usable: hidden images are force-shown, the preloader is
     removed, and text renders without animation.
   ============================================================= */


/* =================================================
   1. TRANSLATIONS
   Dictionaries for all supported languages.
   Project / about pages extend these via Object.assign().
   ================================================= */

var I18N = {
  en: {
    /* ── Navigation ── */
    nav_projects: "Projects",
    nav_about: "About",

    /* ── Homepage ── */
    hero_subtitle: "Architecture Portfolio \u00b7 Selected Works",
    hero_scroll: "Scroll \u2193",
    content_desc: "Architectural projects exploring circular construction, climate-responsive architecture, and socially responsible design.",
    btn_about: "About me",
    btn_scroll_p1: "Scroll down for Project 1",

    /* ── Project navigation ── */
    prev_project: "Previous project",
    next_project: "Next project",
    view_details: "View project details",
    explore_project: "Explore the project",
    design_concept: "Design Concept",

    /* ── Project info labels ── */
    label_project: "Project",
    label_location: "Location",
    label_competition: "Competition",
    label_program: "Program",
    label_budget: "Budget",
    label_construction: "Construction",
    label_office: "Office",
    label_role: "Role",
    label_client: "Client",
    label_status: "Status",
    label_campus_area: "Campus Area",
    label_certifications: "Certifications",

    /* ── Project 1 ── */
    p1_headline: "Djilakh Education Campus",
    p1_lbl_left: "Senegal Secondary School",
    p1_lbl_right: "Djilakh, Thi\u00e8s Region",
    p1_sidebar_3: "Circular pavilions arranged around shared courtyards, preserving six existing trees and creating shaded gathering spaces for 160 students.",
    p1_sidebar_4: "Compressed earth blocks, bamboo structure, and colorful translucent panels \u2014 built by local workers, designed for passive cooling.",
    p1_bigtext: "What if a school could grow with its community? A structure designed to evolve through time, material, and changing needs.",
    p1_meta_project: "Senegal Secondary School \u2014 Building Opportunity in Djilakh",
    p1_meta_location: "Djilakh, Thi\u00e8s Region (Sindia Commune), Senegal",
    p1_meta_competition: "Archstorming \u00d7 Let\u2019s Build My School (LBMS)",
    p1_meta_program: "4 classrooms, admin wing, multipurpose hall, storage, restrooms \u2014 approx. 160 students",
    p1_meta_budget: "\u20ac48,000 \u2013 \u20ac60,000",
    p1_meta_construction: "Compressed earth blocks, bamboo structure, corrugated metal roofing",
    p1_concept_1: "The design responds to Djilakh\u2019s educational crisis \u2014 a village of 4,000 inhabitants where the absence of a secondary school leads to high dropout rates. The proposal creates a modular campus of interconnected circular pavilions arranged around two large courtyards, preserving six existing trees at the heart of the site.",
    p1_concept_2: "A radial structural system of bamboo posts and ring beams supports deeply overhanging roofs, enabling passive cooling through cross-ventilation and shaded circulation. Stabilised compressed earth blocks form the building envelope, providing thermal mass against extreme heat while remaining constructable by local workers without heavy machinery.",
    p1_concept_3: "Colorful translucent panels in cobalt blue, amber yellow, and lime green punctuate the earth-toned facades, filtering light into classrooms and marking thresholds between learning and gathering spaces. The courtyard amphitheatre doubles as a multipurpose cultural venue \u2014 the school as social hub.",
    p1_split_01: "Site & Context",
    p1_split_01_desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    p1_split_02: "Masterplan & Layout",
    p1_split_02_desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    p1_split_03: "Structure & Materials",
    p1_split_03_desc: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
    p1_split_04: "Interior & Learning Spaces",
    p1_split_04_desc: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.",
    p1_split_05: "Community & Impact",
    p1_split_05_desc: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.",

    /* ── Project 2 ── */
    p2_headline: "IPAI Communication Center",
    p2_lbl_left: "IPAI Communication Center",
    p2_lbl_right: "Heilbronn, Germany",
    p2_sidebar_3: "A cylindrical communication center at the heart of a 30-hectare AI campus \u2014 the public face of the Innovation Park Artificial Intelligence in Heilbronn.",
    p2_sidebar_4: "Reflective facades, elevated terraces with integrated planting, and a 1.2-kilometre active ring \u2014 designed for wellbeing in a tech-driven environment.",
    p2_bigtext: "How can architecture translate technological innovation into spatial form? The Project combines a dynamic fa\u00e7ade with an open spatial concept to create a new public interface.",
    p2_meta_project: "IPAI Communication Center",
    p2_meta_location: "Heilbronn, Germany",
    p2_meta_office: "MVRDV (Internship)",
    p2_meta_role: "Architectural Intern \u2014 Communication Center Design Team",
    p2_meta_client: "IPAI Konsortium (Stadt Heilbronn, Dieter Schwarz Stiftung, Schwarz Gruppe)",
    p2_meta_status: "On site (construction began 2025)",
    p2_meta_campus: "265,000 m\u00b2",
    p2_meta_cert: "DGNB Platinum (targeted)",
    p2_concept_1: "The Innovation Park Artificial Intelligence (IPAI) campus in Heilbronn is a 30-hectare hub for over 5,000 researchers, designed by MVRDV around a distinctive circular masterplan. The striking geometry \u2014 visible even in satellite imagery \u2014 positions the campus as a global landmark for responsible AI development, with laboratories, housing, offices, and a central cultural building for public engagement.",
    p2_concept_2: "At the heart of the campus stands the Communication Center, a cylindrical tower with a reflective facade that serves as the public interface between the AI research community and visitors. The building houses exhibitions, conferences, seminars, and a visitor centre, conceived in collaboration with Berlin-based placemaking experts REALACE to invite the public into dialogue with emerging technologies.",
    p2_concept_3: "The design emphasises human wellbeing as a counterpoint to screen-intensive AI work. A car-free campus, bioclimatic facades, hybrid timber construction, and a parametric landscape by LOLA create an environment where tactile organic materials and generous green spaces encourage outdoor collaboration. Energy consumption is projected at 80% below a typical campus, with carbon neutrality achieved over the building\u2019s lifespan through renewable energy, reforestation, and bio-based construction systems.",

    /* ── About page ── */
    cv_languages: "Languages",
    cv_software: "Software",
    cv_experience: "Experience & Projects",
    cv_outside: "Outside the Studio",
    cv_contact_heading: "Let\u2019s build a connection together!",
    cv_find_me: "Find me here",
    cv_send: "Send Message",
    cv_download_cv: "Download CV",
    cv_download_portfolio: "Download Portfolio",
    cv_back: "\u2190 Back to portfolio",
    form_name: "Name",
    form_email: "Email",
    form_subject: "Subject",
    form_message: "Message",
    form_ph_name: "Your name",
    form_ph_email: "Your email",
    form_ph_subject: "Subject",
    form_ph_message: "Your message",
    lang_native: "Native",
    lang_small_latinum: "Small Latinum",
    outside_1_title: "The Outdoor Mind",
    outside_1_desc: "I feel most grounded when I\u2019m outside \u2013 hiking, surfing, cycling, skating. Being in motion and in nature resets my perspective and sharpens how I experience space and atmosphere.",
    outside_2_title: "The Maker",
    outside_2_desc: "I enjoy building wooden furniture and working with clay. There\u2019s something deeply satisfying about shaping material with your hands and understanding how things come together physically.",
    outside_3_title: "The Curious Eye",
    outside_3_desc: "Photography and travel allow me to slow down and pay attention. I\u2019m drawn to light, texture, small details, and the subtle character of different places.",
    outside_4_title: "The Explorer",
    outside_4_desc: "Traveling and discovering different cultures keeps me curious. Experiencing new ways of living broadens how I understand context, scale, and human interaction.",
    outside_5_title: "The Team Player",
    outside_5_desc: "Whether in sports or collaborative projects, I thrive in team environments. I value shared momentum, trust, and learning from others.",

    /* ── Experience entries ── */
    exp_1_title: "Student Assistant \u2013 TU Delft",
    exp_1_sub: "Student Assistant at the Delft Design for Values Institute | December 2025 \u2013 present",
    exp_1_desc: "Supporting coordination, content development, and interdisciplinary exchange on values-driven design across architecture, technology, and society.",
    exp_2_title: "Internship at MVRDV in Rotterdam",
    exp_2_sub: "Architectural Assistant in the DAS team | March \u2013 August 2025",
    exp_2_desc: "Design Assistant at MVRDV\u2019s DAS Studio, contributing to the IPAI Communication Center with a focus on concept development, facade design, and visualization.",
    exp_3_title: "Sustainability Award \u201cTransformathon\u201d by Baufritz",
    exp_3_sub: "Leading role in the \u201cSupertecture\u201d team | September 2024",
    exp_3_desc: "Recognized award for exceptional contributions to sustainable architecture as part of \u201cThe Supertecture project\u201d, focusing on innovative reuse of materials in circular construction, with a special emphasis on practical implementation.",
    exp_4_title: "Church Deconstruction & Material Reuse",
    exp_4_sub: "Coordination of a volunteer team | August 2024",
    exp_4_desc: "Mahogany flooring as a flagship example of circular (de-)construction: The reclaimed materials will be used in future architecture projects. The project was supported by Hilti and documented by ARTE for an upcoming documentary.",
    exp_5_title: "Bachelor Thesis \u2013 The Supertecture Project",
    exp_5_sub: "Technical University of Munich | July 2024",
    exp_5_desc: "The thesis explored innovative methods for material reuse and resource-efficient building practices, focusing on practical solutions for a real-world architectural project. Chair of Architecture and Timber Construction, Prof. Birk. Final evaluation: 1,3",
    exp_6_title: "Internship at HTB (Hochtief Subsidiary)",
    exp_6_sub: "HTB Engineering and Construction S\u00e3o Paulo | August \u2013 October 2023",
    exp_6_desc: "While working full-time on the Teatro Cultura Art\u00edstica restoration in S\u00e3o Paulo, I gained hands-on construction management experience and expanded my technical Portuguese vocabulary through daily site inspections and outdoor space design.",
    exp_7_title: "Internship at RSE+",
    exp_7_sub: "RSE+ Architekten Ingenieure GmbH G\u00f6ttingen | April 2020",
    exp_7_desc: "This internship provided my first exposure to the field of architecture and helped solidify my career choice. I worked in a small office, where I assisted with daily tasks such as revising CAD plans and participating in site visits.",

    /* ── Education ── */
    edu_1_school: "Aalto University",
    edu_1_degree: "Exchange Program in Finland",
    edu_2_school: "Delft University of Technology",
    edu_2_degree: "MSc Architecture, Urbanism and BSc",
    edu_3_school: "Technical University of Munich",
    edu_3_degree: "Architecture B.A.",
    edu_4_school: "Federal University of Rio de Janeiro",
    edu_4_degree: "Exchange Program in Brazil"
  },

  de: {
    nav_projects: "Projekte",
    nav_about: "\u00dcber mich",
    hero_subtitle: "Architektur-Portfolio \u00b7 Ausgew\u00e4hlte Arbeiten",
    hero_scroll: "Scrollen \u2193",
    content_desc: "Architekturprojekte zu zirkul\u00e4rem Bauen, klimagerechter Architektur und sozial verantwortungsvollem Design.",
    btn_about: "\u00dcber mich",
    btn_scroll_p1: "Scrollen f\u00fcr Projekt 1",
    prev_project: "Vorheriges Projekt",
    next_project: "N\u00e4chstes Projekt",
    view_details: "Projektdetails ansehen",
    explore_project: "Projekt entdecken",
    design_concept: "Entwurfskonzept",
    label_project: "Projekt",
    label_location: "Standort",
    label_competition: "Wettbewerb",
    label_program: "Programm",
    label_budget: "Budget",
    label_construction: "Konstruktion",
    label_office: "B\u00fcro",
    label_role: "Rolle",
    label_client: "Auftraggeber",
    label_status: "Status",
    label_campus_area: "Campusfl\u00e4che",
    label_certifications: "Zertifizierungen",
    p1_headline: "Djilakh Bildungscampus",
    p1_lbl_left: "Senegal Sekundarschule",
    p1_lbl_right: "Djilakh, Region Thi\u00e8s",
    p1_sidebar_3: "Kreisf\u00f6rmige Pavillons um gemeinsame Innenh\u00f6fe angeordnet, die sechs vorhandene B\u00e4ume erhalten und schattige Versammlungsorte f\u00fcr 160 Sch\u00fcler schaffen.",
    p1_sidebar_4: "Gepresste Lehmziegel, Bambuskonstruktion und farbige transluzente Paneele \u2014 von lokalen Arbeitern gebaut, f\u00fcr passive K\u00fchlung konzipiert.",
    p1_bigtext: "Was w\u00e4re, wenn eine Schule mit ihrer Gemeinschaft wachsen k\u00f6nnte? Eine Struktur, die sich \u00fcber Zeit, Material und wechselnde Bed\u00fcrfnisse weiterentwickelt.",
    p1_meta_project: "Senegal Sekundarschule \u2014 Chancen schaffen in Djilakh",
    p1_meta_location: "Djilakh, Region Thi\u00e8s (Gemeinde Sindia), Senegal",
    p1_meta_competition: "Archstorming \u00d7 Let\u2019s Build My School (LBMS)",
    p1_meta_program: "4 Klassenr\u00e4ume, Verwaltungstrakt, Mehrzweckhalle, Lager, Sanit\u00e4ranlagen \u2014 ca. 160 Sch\u00fcler",
    p1_meta_budget: "48.000 \u2013 60.000 \u20ac",
    p1_meta_construction: "Gepresste Lehmziegel, Bambuskonstruktion, Wellblechdach",
    p1_concept_1: "Der Entwurf reagiert auf die Bildungskrise in Djilakh \u2014 einem Dorf mit 4.000 Einwohnern, in dem das Fehlen einer Sekundarschule zu hohen Abbruchquoten f\u00fchrt. Der Vorschlag schafft einen modularen Campus aus miteinander verbundenen kreisf\u00f6rmigen Pavillons rund um zwei gro\u00dfe Innenh\u00f6fe, wobei sechs vorhandene B\u00e4ume im Herzen des Gel\u00e4ndes erhalten bleiben.",
    p1_concept_2: "Ein radiales Tragsystem aus Bambuspfosten und Ringbalken tr\u00e4gt weit auskragende D\u00e4cher, die passive K\u00fchlung durch Querbel\u00fcftung und beschattete Wegefl\u00e4chen erm\u00f6glichen. Stabilisierte gepresste Lehmziegel bilden die Geb\u00e4udeh\u00fclle und bieten thermische Masse gegen extreme Hitze, w\u00e4hrend sie von lokalen Arbeitern ohne schwere Maschinen verbaut werden k\u00f6nnen.",
    p1_concept_3: "Farbige transluzente Paneele in Kobaltblau, Bernsteingelb und Lindengr\u00fcn setzen Akzente in den erdfarbenen Fassaden, filtern Licht in die Klassenr\u00e4ume und markieren Schwellen zwischen Lern- und Versammlungsr\u00e4umen. Das Innenhof-Amphitheater dient zugleich als kultureller Mehrzweckort \u2014 die Schule als sozialer Mittelpunkt.",
    p1_split_01: "Ort & Kontext",
    p1_split_02: "Masterplan & Anordnung",
    p1_split_03: "Tragwerk & Materialien",
    p1_split_04: "Innenraum & Lernr\u00e4ume",
    p1_split_05: "Gemeinschaft & Wirkung",
    p2_headline: "IPAI Kommunikationszentrum",
    p2_lbl_left: "IPAI Kommunikationszentrum",
    p2_lbl_right: "Heilbronn, Deutschland",
    p2_sidebar_3: "Ein zylindrisches Kommunikationszentrum im Herzen eines 30 Hektar gro\u00dfen KI-Campus \u2014 das \u00f6ffentliche Gesicht des Innovationsparks K\u00fcnstliche Intelligenz in Heilbronn.",
    p2_sidebar_4: "Reflektierende Fassaden, erh\u00f6hte Terrassen mit integrierter Bepflanzung und ein 1,2 Kilometer langer Aktivring \u2014 f\u00fcr Wohlbefinden in einer technikgepr\u00e4gten Umgebung konzipiert.",
    p2_bigtext: "Wie kann Architektur technologische Innovation in r\u00e4umliche Form \u00fcbersetzen? Das Projekt verbindet eine dynamische Fassade mit einem offenen Raumkonzept zu einer neuen \u00f6ffentlichen Schnittstelle.",
    p2_meta_project: "IPAI Kommunikationszentrum",
    p2_meta_location: "Heilbronn, Deutschland",
    p2_meta_office: "MVRDV (Praktikum)",
    p2_meta_role: "Architekturpraktikantin \u2014 Designteam Kommunikationszentrum",
    p2_meta_client: "IPAI Konsortium (Stadt Heilbronn, Dieter Schwarz Stiftung, Schwarz Gruppe)",
    p2_meta_status: "Im Bau (Baubeginn 2025)",
    p2_meta_campus: "265.000 m\u00b2",
    p2_meta_cert: "DGNB Platin (angestrebt)",
    p2_concept_1: "Der Campus des Innovationsparks K\u00fcnstliche Intelligenz (IPAI) in Heilbronn ist ein 30 Hektar gro\u00dfes Zentrum f\u00fcr \u00fcber 5.000 Forschende, von MVRDV um einen markanten kreisf\u00f6rmigen Masterplan entworfen. Die auff\u00e4llige Geometrie \u2014 selbst auf Satellitenbildern erkennbar \u2014 positioniert den Campus als globales Wahrzeichen f\u00fcr verantwortungsvolle KI-Entwicklung, mit Laboren, Wohnungen, B\u00fcros und einem zentralen Kulturgeb\u00e4ude f\u00fcr \u00f6ffentliches Engagement.",
    p2_concept_2: "Im Herzen des Campus steht das Kommunikationszentrum, ein zylindrischer Turm mit reflektierender Fassade, der als \u00f6ffentliche Schnittstelle zwischen der KI-Forschungsgemeinschaft und Besuchern dient. Das Geb\u00e4ude beherbergt Ausstellungen, Konferenzen, Seminare und ein Besucherzentrum, konzipiert in Zusammenarbeit mit den Berliner Placemaking-Experten REALACE, um die \u00d6ffentlichkeit zum Dialog mit neuen Technologien einzuladen.",
    p2_concept_3: "Der Entwurf betont menschliches Wohlbefinden als Gegengewicht zur bildschirmintensiven KI-Arbeit. Ein autofreier Campus, bioklimatische Fassaden, Holzhybridbauweise und eine parametrische Landschaft von LOLA schaffen eine Umgebung, in der taktile organische Materialien und gro\u00dfz\u00fcgige Gr\u00fcnfl\u00e4chen die Zusammenarbeit im Freien f\u00f6rdern. Der Energieverbrauch wird voraussichtlich 80 % unter dem eines typischen Campus liegen, wobei Klimaneutralit\u00e4t \u00fcber die Lebensdauer des Geb\u00e4udes durch erneuerbare Energien, Aufforstung und biobasierte Bausysteme erreicht wird.",
    cv_languages: "Sprachen",
    cv_software: "Software",
    cv_experience: "Erfahrung & Projekte",
    cv_outside: "Au\u00dferhalb des Studios",
    cv_contact_heading: "Lass uns eine Verbindung aufbauen!",
    cv_find_me: "Hier findest du mich",
    cv_send: "Nachricht senden",
    cv_download_cv: "Lebenslauf herunterladen",
    cv_download_portfolio: "Portfolio herunterladen",
    cv_back: "\u2190 Zur\u00fcck zum Portfolio",
    form_name: "Name",
    form_email: "E-Mail",
    form_subject: "Betreff",
    form_message: "Nachricht",
    form_ph_name: "Dein Name",
    form_ph_email: "Deine E-Mail",
    form_ph_subject: "Betreff",
    form_ph_message: "Deine Nachricht",
    lang_native: "Muttersprache",
    lang_small_latinum: "Kleines Latinum",
    outside_1_title: "Der Outdoor-Geist",
    outside_1_desc: "Ich f\u00fchle mich am meisten geerdet, wenn ich drau\u00dfen bin \u2013 beim Wandern, Surfen, Radfahren, Skaten. Bewegung und Natur setzen meine Perspektive zur\u00fcck und sch\u00e4rfen mein Raumerleben.",
    outside_2_title: "Die Macherin",
    outside_2_desc: "Ich baue gerne Holzm\u00f6bel und arbeite mit Ton. Es ist zutiefst befriedigend, Material mit den H\u00e4nden zu formen und zu verstehen, wie Dinge physisch zusammenkommen.",
    outside_3_title: "Das neugierige Auge",
    outside_3_desc: "Fotografie und Reisen erlauben mir innezuhalten und aufmerksam zu sein. Mich ziehen Licht, Textur, kleine Details und der subtile Charakter verschiedener Orte an.",
    outside_4_title: "Die Entdeckerin",
    outside_4_desc: "Reisen und das Entdecken verschiedener Kulturen h\u00e4lt mich neugierig. Neue Lebensweisen zu erfahren erweitert mein Verst\u00e4ndnis von Kontext, Ma\u00dfstab und menschlicher Interaktion.",
    outside_5_title: "Die Teamspielerin",
    outside_5_desc: "Ob im Sport oder bei gemeinschaftlichen Projekten, ich gedeihe in Teamumgebungen. Ich sch\u00e4tze gemeinsamen Schwung, Vertrauen und voneinander Lernen.",
    exp_1_title: "Studentische Hilfskraft \u2013 TU Delft",
    exp_1_sub: "Studentische Hilfskraft am Delft Design for Values Institute | Dezember 2025 \u2013 heute",
    exp_1_desc: "Unterst\u00fctzung bei Koordination, Inhaltsentwicklung und interdisziplin\u00e4rem Austausch zu werteorientiertem Design in Architektur, Technologie und Gesellschaft.",
    exp_2_title: "Praktikum bei MVRDV in Rotterdam",
    exp_2_sub: "Architekturassistentin im DAS-Team | M\u00e4rz \u2013 August 2025",
    exp_2_desc: "Entwurfsassistentin in MVRDVs DAS Studio mit Beitrag zum IPAI Kommunikationszentrum, Schwerpunkt Konzeptentwicklung, Fassadengestaltung und Visualisierung.",
    exp_3_title: "Nachhaltigkeitspreis \u201eTransformathon\u201c von Baufritz",
    exp_3_sub: "F\u00fchrende Rolle im Team \u201eSupertecture\u201c | September 2024",
    exp_3_desc: "Ausgezeichneter Preis f\u00fcr herausragende Beitr\u00e4ge zur nachhaltigen Architektur als Teil des \u201eThe Supertecture project\u201c, mit Fokus auf innovativer Materialwiederverwendung im zirkul\u00e4ren Bauen.",
    exp_4_title: "Kirchenr\u00fcckbau & Materialwiederverwendung",
    exp_4_sub: "Koordination eines Freiwilligenteams | August 2024",
    exp_4_desc: "Mahagoni-Fu\u00dfb\u00f6den als Vorzeigeprojekt f\u00fcr zirkul\u00e4res (De-)Konstruieren: Die zur\u00fcckgewonnenen Materialien werden in zuk\u00fcnftigen Architekturprojekten eingesetzt. Das Projekt wurde von Hilti unterst\u00fctzt und von ARTE f\u00fcr eine Dokumentation begleitet.",
    exp_5_title: "Bachelorarbeit \u2013 The Supertecture Project",
    exp_5_sub: "Technische Universit\u00e4t M\u00fcnchen | Juli 2024",
    exp_5_desc: "Die Arbeit untersuchte innovative Methoden zur Materialwiederverwendung und ressourceneffizientes Bauen, mit Fokus auf praktische L\u00f6sungen f\u00fcr ein reales Architekturprojekt. Lehrstuhl f\u00fcr Architektur und Holzbau, Prof. Birk. Abschlussnote: 1,3",
    exp_6_title: "Praktikum bei HTB (Hochtief-Tochter)",
    exp_6_sub: "HTB Engineering and Construction S\u00e3o Paulo | August \u2013 Oktober 2023",
    exp_6_desc: "W\u00e4hrend der Vollzeitarbeit an der Restaurierung des Teatro Cultura Art\u00edstica in S\u00e3o Paulo sammelte ich praktische Erfahrung im Baumanagement und erweiterte mein technisches Portugiesisch-Vokabular durch t\u00e4gliche Baustelleninspektionen und Au\u00dfenraumgestaltung.",
    exp_7_title: "Praktikum bei RSE+",
    exp_7_sub: "RSE+ Architekten Ingenieure GmbH G\u00f6ttingen | April 2020",
    exp_7_desc: "Dieses Praktikum bot meinen ersten Einblick in die Architektur und festigte meine Berufswahl. Ich arbeitete in einem kleinen B\u00fcro und unterst\u00fctzte bei t\u00e4glichen Aufgaben wie der \u00dcberarbeitung von CAD-Pl\u00e4nen und der Teilnahme an Baustellenbesuchen.",
    edu_1_degree: "Austauschprogramm in Finnland",
    edu_2_degree: "MSc Architektur, Urbanistik und BSc",
    edu_3_degree: "Architektur B.A.",
    edu_4_degree: "Austauschprogramm in Brasilien"
  },

  pt: {
    nav_projects: "Projetos",
    nav_about: "Sobre",
    hero_subtitle: "Portf\u00f3lio de Arquitetura \u00b7 Trabalhos Selecionados",
    hero_scroll: "Rolar \u2193",
    content_desc: "Projetos arquitet\u00f4nicos explorando constru\u00e7\u00e3o circular, arquitetura clim\u00e1tica e design socialmente respons\u00e1vel.",
    btn_about: "Sobre mim",
    btn_scroll_p1: "Role para o Projeto 1",
    prev_project: "Projeto anterior",
    next_project: "Pr\u00f3ximo projeto",
    view_details: "Ver detalhes do projeto",
    explore_project: "Explorar o projeto",
    design_concept: "Conceito de Design",
    label_project: "Projeto",
    label_location: "Localiza\u00e7\u00e3o",
    label_competition: "Concurso",
    label_program: "Programa",
    label_budget: "Or\u00e7amento",
    label_construction: "Constru\u00e7\u00e3o",
    label_office: "Escrit\u00f3rio",
    label_role: "Fun\u00e7\u00e3o",
    label_client: "Cliente",
    label_status: "Status",
    label_campus_area: "\u00c1rea do Campus",
    label_certifications: "Certifica\u00e7\u00f5es",
    p1_headline: "Campus Educacional Djilakh",
    p1_lbl_left: "Escola Secund\u00e1ria do Senegal",
    p1_lbl_right: "Djilakh, Regi\u00e3o de Thi\u00e8s",
    p1_sidebar_3: "Pavilh\u00f5es circulares dispostos em torno de p\u00e1tios compartilhados, preservando seis \u00e1rvores existentes e criando espa\u00e7os sombreados de conviv\u00eancia para 160 alunos.",
    p1_sidebar_4: "Blocos de terra comprimida, estrutura de bambu e pain\u00e9is transl\u00facidos coloridos \u2014 constru\u00eddo por trabalhadores locais, projetado para resfriamento passivo.",
    p1_bigtext: "E se uma escola pudesse crescer com sua comunidade? Uma estrutura projetada para evoluir atrav\u00e9s do tempo, do material e das necessidades em mudan\u00e7a.",
    p1_meta_project: "Escola Secund\u00e1ria do Senegal \u2014 Construindo Oportunidades em Djilakh",
    p1_meta_location: "Djilakh, Regi\u00e3o de Thi\u00e8s (Munic\u00edpio de Sindia), Senegal",
    p1_meta_competition: "Archstorming \u00d7 Let\u2019s Build My School (LBMS)",
    p1_meta_program: "4 salas de aula, ala administrativa, sal\u00e3o multiuso, dep\u00f3sito, sanit\u00e1rios \u2014 aprox. 160 alunos",
    p1_meta_budget: "\u20ac48.000 \u2013 \u20ac60.000",
    p1_meta_construction: "Blocos de terra comprimida, estrutura de bambu, cobertura de metal corrugado",
    p1_concept_1: "O projeto responde \u00e0 crise educacional de Djilakh \u2014 uma aldeia de 4.000 habitantes onde a aus\u00eancia de escola secund\u00e1ria leva a altas taxas de evas\u00e3o. A proposta cria um campus modular de pavilh\u00f5es circulares interconectados dispostos em torno de dois grandes p\u00e1tios, preservando seis \u00e1rvores existentes no cora\u00e7\u00e3o do terreno.",
    p1_concept_2: "Um sistema estrutural radial de postes de bambu e vigas anelares sustenta telhados com grandes beir\u00e3is, permitindo resfriamento passivo por ventila\u00e7\u00e3o cruzada e circula\u00e7\u00e3o sombreada. Blocos de terra comprimida estabilizados formam o envelope do edif\u00edcio, fornecendo massa t\u00e9rmica contra o calor extremo, sendo constru\u00edveis por trabalhadores locais sem maquin\u00e1rio pesado.",
    p1_concept_3: "Pain\u00e9is transl\u00facidos coloridos em azul cobalto, amarelo \u00e2mbar e verde lim\u00e3o pontuam as fachadas em tons terrosos, filtrando a luz nas salas de aula e marcando limiares entre espa\u00e7os de aprendizagem e conviv\u00eancia. O anfiteatro do p\u00e1tio funciona como espa\u00e7o cultural multiuso \u2014 a escola como centro social.",
    p2_headline: "Centro de Comunica\u00e7\u00e3o IPAI",
    p2_lbl_left: "Centro de Comunica\u00e7\u00e3o IPAI",
    p2_lbl_right: "Heilbronn, Alemanha",
    p2_sidebar_3: "Um centro de comunica\u00e7\u00e3o cil\u00edndrico no cora\u00e7\u00e3o de um campus de IA de 30 hectares \u2014 a face p\u00fablica do Parque de Inova\u00e7\u00e3o de Intelig\u00eancia Artificial em Heilbronn.",
    p2_sidebar_4: "Fachadas refletivas, terra\u00e7os elevados com plantio integrado e um anel ativo de 1,2 km \u2014 projetado para o bem-estar em um ambiente orientado pela tecnologia.",
    p2_bigtext: "Como a arquitetura pode traduzir inova\u00e7\u00e3o tecnol\u00f3gica em forma espacial? O projeto combina uma fachada din\u00e2mica com um conceito espacial aberto para criar uma nova interface p\u00fablica.",
    p2_meta_project: "Centro de Comunica\u00e7\u00e3o IPAI",
    p2_meta_location: "Heilbronn, Alemanha",
    p2_meta_office: "MVRDV (Est\u00e1gio)",
    p2_meta_role: "Estagi\u00e1ria de Arquitetura \u2014 Equipe de Design do Centro de Comunica\u00e7\u00e3o",
    p2_meta_client: "IPAI Kons\u00f3rcio (Stadt Heilbronn, Dieter Schwarz Stiftung, Schwarz Gruppe)",
    p2_meta_status: "Em constru\u00e7\u00e3o (in\u00edcio das obras em 2025)",
    p2_meta_campus: "265.000 m\u00b2",
    p2_meta_cert: "DGNB Platina (almejado)",
    p2_concept_1: "O campus do IPAI em Heilbronn \u00e9 um polo de 30 hectares para mais de 5.000 pesquisadores, projetado pela MVRDV em torno de um masterplan circular distinto. A geometria marcante \u2014 vis\u00edvel at\u00e9 em imagens de sat\u00e9lite \u2014 posiciona o campus como um marco global para o desenvolvimento respons\u00e1vel de IA.",
    p2_concept_2: "No cora\u00e7\u00e3o do campus ergue-se o Centro de Comunica\u00e7\u00e3o, uma torre cil\u00edndrica com fachada refletiva que serve como interface p\u00fablica entre a comunidade de pesquisa em IA e os visitantes. O edif\u00edcio abriga exposi\u00e7\u00f5es, confer\u00eancias, semin\u00e1rios e um centro de visitantes.",
    p2_concept_3: "O design enfatiza o bem-estar humano como contraponto ao trabalho intensivo em telas da IA. Um campus sem carros, fachadas bioclim\u00e1ticas, constru\u00e7\u00e3o h\u00edbrida em madeira e uma paisagem param\u00e9trica criam um ambiente onde materiais org\u00e2nicos t\u00e1teis e generosos espa\u00e7os verdes incentivam a colabora\u00e7\u00e3o ao ar livre.",
    cv_languages: "Idiomas",
    cv_software: "Software",
    cv_experience: "Experi\u00eancia & Projetos",
    cv_outside: "Fora do Est\u00fadio",
    cv_contact_heading: "Vamos construir uma conex\u00e3o juntos!",
    cv_find_me: "Me encontre aqui",
    cv_send: "Enviar mensagem",
    cv_download_cv: "Baixar CV",
    cv_download_portfolio: "Baixar Portf\u00f3lio",
    cv_back: "\u2190 Voltar ao portf\u00f3lio",
    form_name: "Nome",
    form_email: "E-mail",
    form_subject: "Assunto",
    form_message: "Mensagem",
    form_ph_name: "Seu nome",
    form_ph_email: "Seu e-mail",
    form_ph_subject: "Assunto",
    form_ph_message: "Sua mensagem",
    lang_native: "Nativo",
    lang_small_latinum: "Latim B\u00e1sico",
    outside_1_title: "A Mente ao Ar Livre",
    outside_1_desc: "Me sinto mais centrada quando estou l\u00e1 fora \u2013 caminhando, surfando, pedalando, patinando. O movimento e a natureza renovam minha perspectiva e aguçam como experimento o espa\u00e7o.",
    outside_2_title: "A Construtora",
    outside_2_desc: "Gosto de construir m\u00f3veis de madeira e trabalhar com argila. H\u00e1 algo profundamente satisfat\u00f3rio em moldar materiais com as m\u00e3os.",
    outside_3_title: "O Olhar Curioso",
    outside_3_desc: "Fotografia e viagens me permitem desacelerar e prestar aten\u00e7\u00e3o. Sou atra\u00edda pela luz, textura, pequenos detalhes e o car\u00e1ter sutil de diferentes lugares.",
    outside_4_title: "A Exploradora",
    outside_4_desc: "Viajar e descobrir diferentes culturas me mant\u00e9m curiosa. Vivenciar novas formas de viver amplia minha compreens\u00e3o de contexto, escala e intera\u00e7\u00e3o humana.",
    outside_5_title: "A Jogadora de Equipe",
    outside_5_desc: "Seja no esporte ou em projetos colaborativos, prospero em ambientes de equipe. Valorizo o impulso compartilhado, a confian\u00e7a e aprender com os outros.",
    exp_1_title: "Assistente Estudantil \u2013 TU Delft",
    exp_1_sub: "Assistente Estudantil no Delft Design for Values Institute | Dezembro 2025 \u2013 atual",
    exp_1_desc: "Apoio na coordena\u00e7\u00e3o, desenvolvimento de conte\u00fado e interc\u00e2mbio interdisciplinar sobre design orientado por valores em arquitetura, tecnologia e sociedade.",
    exp_2_title: "Est\u00e1gio na MVRDV em Roterd\u00e3",
    exp_2_sub: "Assistente de Arquitetura na equipe DAS | Mar\u00e7o \u2013 Agosto 2025",
    exp_2_desc: "Assistente de Design no DAS Studio da MVRDV, contribuindo para o Centro de Comunica\u00e7\u00e3o IPAI com foco em desenvolvimento conceitual, design de fachada e visualiza\u00e7\u00e3o.",
    exp_3_title: "Pr\u00eamio de Sustentabilidade \u201cTransformathon\u201d por Baufritz",
    exp_3_sub: "Papel de lideran\u00e7a na equipe \u201cSupertecture\u201d | Setembro 2024",
    exp_3_desc: "Pr\u00eamio reconhecido por contribui\u00e7\u00f5es excepcionais \u00e0 arquitetura sustent\u00e1vel como parte do \u201cThe Supertecture project\u201d, com foco na reutiliza\u00e7\u00e3o inovadora de materiais na constru\u00e7\u00e3o circular.",
    exp_4_title: "Desmantelamento de Igreja & Reutiliza\u00e7\u00e3o de Materiais",
    exp_4_sub: "Coordena\u00e7\u00e3o de equipe volunt\u00e1ria | Agosto 2024",
    exp_4_desc: "Piso de mogno como exemplo emblem\u00e1tico de (des)constru\u00e7\u00e3o circular: os materiais recuperados ser\u00e3o usados em futuros projetos de arquitetura. O projeto foi apoiado pela Hilti e documentado pela ARTE.",
    exp_5_title: "Trabalho de Conclus\u00e3o \u2013 The Supertecture Project",
    exp_5_sub: "Universidade T\u00e9cnica de Munique | Julho 2024",
    exp_5_desc: "A tese explorou m\u00e9todos inovadores para reutiliza\u00e7\u00e3o de materiais e pr\u00e1ticas construtivas eficientes em recursos, com foco em solu\u00e7\u00f5es pr\u00e1ticas para um projeto arquitet\u00f4nico real. C\u00e1tedra de Arquitetura e Constru\u00e7\u00e3o em Madeira, Prof. Birk. Nota final: 1,3",
    exp_6_title: "Est\u00e1gio na HTB (Subsidi\u00e1ria da Hochtief)",
    exp_6_sub: "HTB Engenharia e Constru\u00e7\u00e3o S\u00e3o Paulo | Agosto \u2013 Outubro 2023",
    exp_6_desc: "Trabalhando em tempo integral na restaura\u00e7\u00e3o do Teatro Cultura Art\u00edstica em S\u00e3o Paulo, adquiri experi\u00eancia pr\u00e1tica em gerenciamento de obras e ampliei meu vocabul\u00e1rio t\u00e9cnico em portugu\u00eas.",
    exp_7_title: "Est\u00e1gio na RSE+",
    exp_7_sub: "RSE+ Architekten Ingenieure GmbH G\u00f6ttingen | Abril 2020",
    exp_7_desc: "Este est\u00e1gio proporcionou meu primeiro contato com o campo da arquitetura e ajudou a solidificar minha escolha de carreira.",
    edu_1_degree: "Programa de Interc\u00e2mbio na Finl\u00e2ndia",
    edu_2_degree: "MSc Arquitetura, Urbanismo e BSc",
    edu_3_degree: "Arquitetura B.A.",
    edu_4_degree: "Programa de Interc\u00e2mbio no Brasil"
  },

  es: {
    nav_projects: "Proyectos",
    nav_about: "Sobre m\u00ed",
    hero_subtitle: "Portafolio de Arquitectura \u00b7 Obras Seleccionadas",
    hero_scroll: "Desplazar \u2193",
    content_desc: "Proyectos arquitect\u00f3nicos que exploran la construcci\u00f3n circular, la arquitectura clim\u00e1tica y el dise\u00f1o socialmente responsable.",
    btn_about: "Sobre m\u00ed",
    btn_scroll_p1: "Desplaza para el Proyecto 1",
    prev_project: "Proyecto anterior",
    next_project: "Siguiente proyecto",
    view_details: "Ver detalles del proyecto",
    explore_project: "Explorar el proyecto",
    design_concept: "Concepto de Dise\u00f1o",
    label_project: "Proyecto",
    label_location: "Ubicaci\u00f3n",
    label_competition: "Concurso",
    label_program: "Programa",
    label_budget: "Presupuesto",
    label_construction: "Construcci\u00f3n",
    label_office: "Oficina",
    label_role: "Rol",
    label_client: "Cliente",
    label_status: "Estado",
    label_campus_area: "\u00c1rea del Campus",
    label_certifications: "Certificaciones",
    p1_headline: "Campus Educativo Djilakh",
    p1_lbl_left: "Escuela Secundaria de Senegal",
    p1_lbl_right: "Djilakh, Regi\u00f3n de Thi\u00e8s",
    p1_sidebar_3: "Pabellones circulares dispuestos alrededor de patios compartidos, preservando seis \u00e1rboles existentes y creando espacios sombreados para 160 estudiantes.",
    p1_sidebar_4: "Bloques de tierra comprimida, estructura de bamb\u00fa y paneles transl\u00facidos coloridos \u2014 construido por trabajadores locales, dise\u00f1ado para enfriamiento pasivo.",
    p1_bigtext: "\u00bfY si una escuela pudiera crecer con su comunidad? Una estructura dise\u00f1ada para evolucionar a trav\u00e9s del tiempo, el material y las necesidades cambiantes.",
    p1_meta_project: "Escuela Secundaria de Senegal \u2014 Construyendo Oportunidades en Djilakh",
    p1_meta_location: "Djilakh, Regi\u00f3n de Thi\u00e8s (Municipio de Sindia), Senegal",
    p1_meta_competition: "Archstorming \u00d7 Let\u2019s Build My School (LBMS)",
    p1_meta_program: "4 aulas, ala administrativa, sal\u00f3n multiusos, almac\u00e9n, ba\u00f1os \u2014 aprox. 160 estudiantes",
    p1_meta_budget: "\u20ac48.000 \u2013 \u20ac60.000",
    p1_meta_construction: "Bloques de tierra comprimida, estructura de bamb\u00fa, techo de metal corrugado",
    p1_concept_1: "El dise\u00f1o responde a la crisis educativa de Djilakh \u2014 una aldea de 4.000 habitantes donde la falta de escuela secundaria lleva a altas tasas de deserci\u00f3n. La propuesta crea un campus modular de pabellones circulares interconectados dispuestos alrededor de dos grandes patios, preservando seis \u00e1rboles existentes en el coraz\u00f3n del sitio.",
    p1_concept_2: "Un sistema estructural radial de postes de bamb\u00fa y vigas anulares soporta techos con grandes voladizos, permitiendo enfriamiento pasivo por ventilaci\u00f3n cruzada y circulaci\u00f3n sombreada. Los bloques de tierra comprimida estabilizados forman la envolvente del edificio, proporcionando masa t\u00e9rmica contra el calor extremo.",
    p1_concept_3: "Paneles transl\u00facidos coloridos en azul cobalto, amarillo \u00e1mbar y verde lima puntuan las fachadas en tonos tierra, filtrando la luz en las aulas y marcando umbrales entre espacios de aprendizaje y reuni\u00f3n. El anfiteatro del patio funciona como espacio cultural multiusos \u2014 la escuela como centro social.",
    p2_headline: "Centro de Comunicaci\u00f3n IPAI",
    p2_lbl_left: "Centro de Comunicaci\u00f3n IPAI",
    p2_lbl_right: "Heilbronn, Alemania",
    p2_sidebar_3: "Un centro de comunicaci\u00f3n cil\u00edndrico en el coraz\u00f3n de un campus de IA de 30 hect\u00e1reas \u2014 la cara p\u00fablica del Parque de Innovaci\u00f3n de Inteligencia Artificial en Heilbronn.",
    p2_sidebar_4: "Fachadas reflectantes, terrazas elevadas con plantaci\u00f3n integrada y un anillo activo de 1,2 km \u2014 dise\u00f1ado para el bienestar en un entorno tecnol\u00f3gico.",
    p2_bigtext: "\u00bfC\u00f3mo puede la arquitectura traducir la innovaci\u00f3n tecnol\u00f3gica en forma espacial? El proyecto combina una fachada din\u00e1mica con un concepto espacial abierto para crear una nueva interfaz p\u00fablica.",
    p2_meta_project: "Centro de Comunicaci\u00f3n IPAI",
    p2_meta_location: "Heilbronn, Alemania",
    p2_meta_office: "MVRDV (Pasant\u00eda)",
    p2_meta_role: "Pasante de Arquitectura \u2014 Equipo de Dise\u00f1o del Centro de Comunicaci\u00f3n",
    p2_meta_status: "En construcci\u00f3n (inicio de obras en 2025)",
    p2_meta_campus: "265.000 m\u00b2",
    p2_meta_cert: "DGNB Platino (objetivo)",
    p2_concept_1: "El campus del IPAI en Heilbronn es un centro de 30 hect\u00e1reas para m\u00e1s de 5.000 investigadores, dise\u00f1ado por MVRDV alrededor de un masterplan circular distintivo.",
    p2_concept_2: "En el coraz\u00f3n del campus se alza el Centro de Comunicaci\u00f3n, una torre cil\u00edndrica con fachada reflectante que sirve como interfaz p\u00fablica entre la comunidad investigadora de IA y los visitantes.",
    p2_concept_3: "El dise\u00f1o enfatiza el bienestar humano como contrapunto al trabajo intensivo en pantallas. Un campus sin coches, fachadas bioclim\u00e1ticas, construcci\u00f3n h\u00edbrida en madera y un paisaje param\u00e9trico crean un ambiente donde materiales org\u00e1nicos y generosos espacios verdes fomentan la colaboraci\u00f3n al aire libre.",
    cv_languages: "Idiomas",
    cv_software: "Software",
    cv_experience: "Experiencia y Proyectos",
    cv_outside: "Fuera del Estudio",
    cv_contact_heading: "\u00a1Construyamos una conexi\u00f3n juntos!",
    cv_find_me: "Enccu\u00e9ntrame aqu\u00ed",
    cv_send: "Enviar mensaje",
    cv_download_cv: "Descargar CV",
    cv_download_portfolio: "Descargar Portafolio",
    cv_back: "\u2190 Volver al portafolio",
    form_name: "Nombre",
    form_email: "Correo",
    form_subject: "Asunto",
    form_message: "Mensaje",
    form_ph_name: "Tu nombre",
    form_ph_email: "Tu correo",
    form_ph_subject: "Asunto",
    form_ph_message: "Tu mensaje",
    lang_native: "Nativo",
    lang_small_latinum: "Lat\u00edn B\u00e1sico",
    outside_1_title: "La Mente al Aire Libre",
    outside_1_desc: "Me siento m\u00e1s centrada cuando estoy afuera \u2013 caminando, surfeando, en bicicleta, patinando. El movimiento y la naturaleza renuevan mi perspectiva.",
    outside_2_title: "La Constructora",
    outside_2_desc: "Disfruto construir muebles de madera y trabajar con arcilla. Hay algo profundamente satisfactorio en dar forma a los materiales con las manos.",
    outside_3_title: "El Ojo Curioso",
    outside_3_desc: "La fotograf\u00eda y los viajes me permiten ir m\u00e1s despacio y prestar atenci\u00f3n. Me atraen la luz, la textura, los peque\u00f1os detalles y el car\u00e1cter sutil de diferentes lugares.",
    outside_4_title: "La Exploradora",
    outside_4_desc: "Viajar y descubrir diferentes culturas me mantiene curiosa. Experimentar nuevas formas de vida ampl\u00eda mi comprensi\u00f3n del contexto, la escala y la interacci\u00f3n humana.",
    outside_5_title: "La Jugadora de Equipo",
    outside_5_desc: "Ya sea en el deporte o en proyectos colaborativos, prospero en entornos de equipo. Valoro el impulso compartido, la confianza y aprender de los dem\u00e1s.",
    exp_1_title: "Asistente Estudiantil \u2013 TU Delft",
    exp_1_sub: "Asistente en el Instituto Delft Design for Values | Diciembre 2025 \u2013 presente",
    exp_1_desc: "Apoyo en coordinaci\u00f3n, desarrollo de contenido e intercambio interdisciplinario sobre dise\u00f1o orientado por valores.",
    exp_2_title: "Pasant\u00eda en MVRDV en R\u00f3terdam",
    exp_2_sub: "Asistente de Arquitectura en el equipo DAS | Marzo \u2013 Agosto 2025",
    exp_2_desc: "Asistente de Dise\u00f1o en el DAS Studio de MVRDV, contribuyendo al Centro de Comunicaci\u00f3n IPAI con enfoque en desarrollo conceptual, dise\u00f1o de fachada y visualizaci\u00f3n.",
    exp_3_title: "Premio de Sostenibilidad \u201cTransformathon\u201d por Baufritz",
    exp_3_sub: "Rol de liderazgo en el equipo \u201cSupertecture\u201d | Septiembre 2024",
    exp_3_desc: "Premio reconocido por contribuciones excepcionales a la arquitectura sostenible como parte del proyecto \u201cThe Supertecture\u201d.",
    exp_4_title: "Desmontaje de Iglesia y Reutilizaci\u00f3n de Materiales",
    exp_4_sub: "Coordinaci\u00f3n de equipo voluntario | Agosto 2024",
    exp_4_desc: "Pisos de caoba como ejemplo emblem\u00e1tico de (de)construcci\u00f3n circular: los materiales recuperados se usar\u00e1n en futuros proyectos de arquitectura.",
    exp_5_title: "Tesis de Licenciatura \u2013 The Supertecture Project",
    exp_5_sub: "Universidad T\u00e9cnica de M\u00fanich | Julio 2024",
    exp_5_desc: "La tesis explor\u00f3 m\u00e9todos innovadores para reutilizaci\u00f3n de materiales y pr\u00e1cticas constructivas eficientes en recursos.",
    exp_6_title: "Pasant\u00eda en HTB (Subsidiaria de Hochtief)",
    exp_6_sub: "HTB Ingenier\u00eda y Construcci\u00f3n S\u00e3o Paulo | Agosto \u2013 Octubre 2023",
    exp_6_desc: "Trabajando en la restauraci\u00f3n del Teatro Cultura Art\u00edstica en S\u00e3o Paulo, adquir\u00ed experiencia pr\u00e1ctica en gesti\u00f3n de obra.",
    exp_7_title: "Pasant\u00eda en RSE+",
    exp_7_sub: "RSE+ Architekten Ingenieure GmbH G\u00f6ttingen | Abril 2020",
    exp_7_desc: "Esta pasant\u00eda proporcion\u00f3 mi primer contacto con el campo de la arquitectura y ayud\u00f3 a solidificar mi elecci\u00f3n de carrera.",
    edu_1_degree: "Programa de Intercambio en Finlandia",
    edu_2_degree: "MSc Arquitectura, Urbanismo y BSc",
    edu_3_degree: "Arquitectura B.A.",
    edu_4_degree: "Programa de Intercambio en Brasil"
  },

  it: {
    nav_projects: "Progetti",
    nav_about: "Chi sono",
    hero_subtitle: "Portfolio di Architettura \u00b7 Opere Selezionate",
    hero_scroll: "Scorri \u2193",
    content_desc: "Progetti architettonici che esplorano la costruzione circolare, l\u2019architettura climatica e il design socialmente responsabile.",
    btn_about: "Su di me",
    btn_scroll_p1: "Scorri per il Progetto 1",
    prev_project: "Progetto precedente",
    next_project: "Progetto successivo",
    view_details: "Vedi dettagli del progetto",
    explore_project: "Esplora il progetto",
    design_concept: "Concetto di Design",
    label_project: "Progetto",
    label_location: "Posizione",
    label_competition: "Concorso",
    label_program: "Programma",
    label_budget: "Budget",
    label_construction: "Costruzione",
    label_office: "Studio",
    label_role: "Ruolo",
    label_client: "Cliente",
    label_status: "Stato",
    label_campus_area: "Area del Campus",
    label_certifications: "Certificazioni",
    p1_headline: "Campus Educativo Djilakh",
    p1_lbl_left: "Scuola Secondaria del Senegal",
    p1_lbl_right: "Djilakh, Regione di Thi\u00e8s",
    p1_sidebar_3: "Padiglioni circolari disposti attorno a cortili condivisi, preservando sei alberi esistenti e creando spazi ombreggiati per 160 studenti.",
    p1_sidebar_4: "Blocchi di terra compressa, struttura in bamb\u00f9 e pannelli traslucidi colorati \u2014 costruito da lavoratori locali, progettato per il raffreddamento passivo.",
    p1_bigtext: "E se una scuola potesse crescere con la sua comunit\u00e0? Una struttura progettata per evolversi nel tempo, nel materiale e nelle esigenze mutevoli.",
    p1_meta_project: "Scuola Secondaria del Senegal \u2014 Costruire Opportunit\u00e0 a Djilakh",
    p1_meta_location: "Djilakh, Regione di Thi\u00e8s (Comune di Sindia), Senegal",
    p1_meta_competition: "Archstorming \u00d7 Let\u2019s Build My School (LBMS)",
    p1_meta_program: "4 aule, ala amministrativa, sala polivalente, magazzino, servizi igienici \u2014 circa 160 studenti",
    p1_meta_budget: "\u20ac48.000 \u2013 \u20ac60.000",
    p1_meta_construction: "Blocchi di terra compressa, struttura in bamb\u00f9, copertura in lamiera ondulata",
    p1_concept_1: "Il progetto risponde alla crisi educativa di Djilakh \u2014 un villaggio di 4.000 abitanti dove l\u2019assenza di una scuola secondaria porta ad alti tassi di abbandono. La proposta crea un campus modulare di padiglioni circolari interconnessi disposti attorno a due grandi cortili, preservando sei alberi esistenti nel cuore del sito.",
    p1_concept_2: "Un sistema strutturale radiale di pali di bamb\u00f9 e travi anulari sostiene tetti con ampie sporgenze, permettendo il raffreddamento passivo attraverso la ventilazione incrociata e la circolazione ombreggiata.",
    p1_concept_3: "Pannelli traslucidi colorati in blu cobalto, giallo ambra e verde lime punteggiano le facciate in toni terra, filtrando la luce nelle aule e segnando le soglie tra spazi di apprendimento e aggregazione. L\u2019anfiteatro del cortile funge da spazio culturale polivalente \u2014 la scuola come centro sociale.",
    p2_headline: "Centro di Comunicazione IPAI",
    p2_lbl_left: "Centro di Comunicazione IPAI",
    p2_lbl_right: "Heilbronn, Germania",
    p2_sidebar_3: "Un centro di comunicazione cilindrico nel cuore di un campus IA di 30 ettari \u2014 il volto pubblico del Parco di Innovazione per l\u2019Intelligenza Artificiale a Heilbronn.",
    p2_sidebar_4: "Facciate riflettenti, terrazze sopraelevate con piantumazione integrata e un anello attivo di 1,2 km \u2014 progettato per il benessere in un ambiente tecnologico.",
    p2_bigtext: "Come pu\u00f2 l\u2019architettura tradurre l\u2019innovazione tecnologica in forma spaziale? Il progetto combina una facciata dinamica con un concetto spaziale aperto per creare una nuova interfaccia pubblica.",
    p2_meta_project: "Centro di Comunicazione IPAI",
    p2_meta_location: "Heilbronn, Germania",
    p2_meta_office: "MVRDV (Tirocinio)",
    p2_meta_role: "Tirocinante di Architettura \u2014 Team di Design del Centro di Comunicazione",
    p2_meta_status: "In costruzione (inizio lavori 2025)",
    p2_meta_campus: "265.000 m\u00b2",
    p2_meta_cert: "DGNB Platino (obiettivo)",
    p2_concept_1: "Il campus IPAI a Heilbronn \u00e8 un polo di 30 ettari per oltre 5.000 ricercatori, progettato da MVRDV attorno a un masterplan circolare distintivo.",
    p2_concept_2: "Al centro del campus sorge il Centro di Comunicazione, una torre cilindrica con facciata riflettente che funge da interfaccia pubblica tra la comunit\u00e0 di ricerca IA e i visitatori.",
    p2_concept_3: "Il design enfatizza il benessere umano come contrappunto al lavoro intensivo su schermo dell\u2019IA. Un campus senza auto, facciate bioclimatiche, costruzione ibrida in legno e un paesaggio parametrico creano un ambiente dove materiali organici tattili e generosi spazi verdi incoraggiano la collaborazione all\u2019aperto.",
    cv_languages: "Lingue",
    cv_software: "Software",
    cv_experience: "Esperienza e Progetti",
    cv_outside: "Fuori dallo Studio",
    cv_contact_heading: "Costruiamo un legame insieme!",
    cv_find_me: "Trovami qui",
    cv_send: "Invia messaggio",
    cv_download_cv: "Scarica CV",
    cv_download_portfolio: "Scarica Portfolio",
    cv_back: "\u2190 Torna al portfolio",
    form_name: "Nome",
    form_email: "Email",
    form_subject: "Oggetto",
    form_message: "Messaggio",
    form_ph_name: "Il tuo nome",
    form_ph_email: "La tua email",
    form_ph_subject: "Oggetto",
    form_ph_message: "Il tuo messaggio",
    lang_native: "Madrelingua",
    lang_small_latinum: "Latino Base",
    outside_1_title: "La Mente all\u2019Aperto",
    outside_1_desc: "Mi sento pi\u00f9 radicata quando sono fuori \u2013 camminando, surfando, pedalando, pattinando. Il movimento e la natura rinnovano la mia prospettiva.",
    outside_2_title: "La Creatrice",
    outside_2_desc: "Mi piace costruire mobili in legno e lavorare con l\u2019argilla. C\u2019\u00e8 qualcosa di profondamente soddisfacente nel modellare il materiale con le mani.",
    outside_3_title: "L\u2019Occhio Curioso",
    outside_3_desc: "La fotografia e i viaggi mi permettono di rallentare e prestare attenzione. Sono attratta dalla luce, dalla texture, dai piccoli dettagli e dal carattere sottile dei diversi luoghi.",
    outside_4_title: "L\u2019Esploratrice",
    outside_4_desc: "Viaggiare e scoprire culture diverse mi mantiene curiosa. Sperimentare nuovi modi di vivere amplia la mia comprensione del contesto, della scala e dell\u2019interazione umana.",
    outside_5_title: "La Giocatrice di Squadra",
    outside_5_desc: "Che sia nello sport o in progetti collaborativi, prospero negli ambienti di gruppo. Apprezzo lo slancio condiviso, la fiducia e imparare dagli altri.",
    exp_1_title: "Assistente Studentesca \u2013 TU Delft",
    exp_1_sub: "Assistente al Delft Design for Values Institute | Dicembre 2025 \u2013 presente",
    exp_1_desc: "Supporto nel coordinamento, sviluppo di contenuti e scambio interdisciplinare sul design orientato ai valori.",
    exp_2_title: "Tirocinio presso MVRDV a Rotterdam",
    exp_2_sub: "Assistente di Architettura nel team DAS | Marzo \u2013 Agosto 2025",
    exp_2_desc: "Assistente di Design nel DAS Studio di MVRDV, contribuendo al Centro di Comunicazione IPAI.",
    exp_3_title: "Premio Sostenibilit\u00e0 \u201cTransformathon\u201d di Baufritz",
    exp_3_sub: "Ruolo di leadership nel team \u201cSupertecture\u201d | Settembre 2024",
    exp_3_desc: "Premio riconosciuto per contributi eccezionali all\u2019architettura sostenibile come parte del progetto \u201cThe Supertecture\u201d.",
    exp_4_title: "Decostruzione Chiesa e Riuso Materiali",
    exp_4_sub: "Coordinamento di un team di volontari | Agosto 2024",
    exp_4_desc: "Pavimenti in mogano come esempio emblematico di (de)costruzione circolare: i materiali recuperati saranno utilizzati in futuri progetti architettonici.",
    exp_5_title: "Tesi di Laurea \u2013 The Supertecture Project",
    exp_5_sub: "Universit\u00e0 Tecnica di Monaco | Luglio 2024",
    exp_5_desc: "La tesi ha esplorato metodi innovativi per il riuso dei materiali e pratiche costruttive efficienti.",
    exp_6_title: "Tirocinio presso HTB (Sussidiaria Hochtief)",
    exp_6_sub: "HTB Ingegneria e Costruzione S\u00e3o Paulo | Agosto \u2013 Ottobre 2023",
    exp_6_desc: "Lavorando alla restaurazione del Teatro Cultura Art\u00edstica a S\u00e3o Paulo, ho acquisito esperienza pratica nella gestione dei cantieri.",
    exp_7_title: "Tirocinio presso RSE+",
    exp_7_sub: "RSE+ Architekten Ingenieure GmbH G\u00f6ttingen | Aprile 2020",
    exp_7_desc: "Questo tirocinio mi ha dato la prima esposizione al campo dell\u2019architettura e ha consolidato la mia scelta di carriera.",
    edu_1_degree: "Programma di Scambio in Finlandia",
    edu_2_degree: "MSc Architettura, Urbanistica e BSc",
    edu_3_degree: "Architettura B.A.",
    edu_4_degree: "Programma di Scambio in Brasile"
  },

  nl: {
    nav_projects: "Projecten",
    nav_about: "Over mij",
    hero_subtitle: "Architectuurportfolio \u00b7 Geselecteerde Werken",
    hero_scroll: "Scroll \u2193",
    content_desc: "Architectuurprojecten over circulair bouwen, klimaatadaptieve architectuur en sociaal verantwoord ontwerp.",
    btn_about: "Over mij",
    btn_scroll_p1: "Scroll voor Project 1",
    prev_project: "Vorig project",
    next_project: "Volgend project",
    view_details: "Bekijk projectdetails",
    explore_project: "Ontdek het project",
    design_concept: "Ontwerpconcept",
    label_project: "Project",
    label_location: "Locatie",
    label_competition: "Wedstrijd",
    label_program: "Programma",
    label_budget: "Budget",
    label_construction: "Constructie",
    label_office: "Bureau",
    label_role: "Rol",
    label_client: "Opdrachtgever",
    label_status: "Status",
    label_campus_area: "Campusoppervlakte",
    label_certifications: "Certificeringen",
    p1_headline: "Djilakh Onderwijscampus",
    p1_lbl_left: "Senegal Middelbare School",
    p1_lbl_right: "Djilakh, Regio Thi\u00e8s",
    p1_sidebar_3: "Cirkelvormige paviljoens rond gedeelde binnenplaatsen, met behoud van zes bestaande bomen en schaduwrijke ontmoetingsplekken voor 160 leerlingen.",
    p1_sidebar_4: "Geperste aarden blokken, bamboeconstructie en kleurrijke doorschijnende panelen \u2014 gebouwd door lokale arbeiders, ontworpen voor passieve koeling.",
    p1_bigtext: "Wat als een school kon meegroeien met haar gemeenschap? Een structuur ontworpen om te evolueren door tijd, materiaal en veranderende behoeften.",
    p1_meta_project: "Senegal Middelbare School \u2014 Kansen Bouwen in Djilakh",
    p1_meta_location: "Djilakh, Regio Thi\u00e8s (Gemeente Sindia), Senegal",
    p1_meta_competition: "Archstorming \u00d7 Let\u2019s Build My School (LBMS)",
    p1_meta_program: "4 klaslokalen, administratievleugel, multifunctionele zaal, opslag, sanitair \u2014 ca. 160 leerlingen",
    p1_meta_budget: "\u20ac48.000 \u2013 \u20ac60.000",
    p1_meta_construction: "Geperste aarden blokken, bamboeconstructie, golfplaten dak",
    p1_concept_1: "Het ontwerp reageert op de onderwijscrisis in Djilakh \u2014 een dorp van 4.000 inwoners waar het ontbreken van een middelbare school leidt tot hoge uitvalpercentages. Het voorstel cre\u00ebert een modulaire campus van onderling verbonden cirkelvormige paviljoens rond twee grote binnenplaatsen, met behoud van zes bestaande bomen.",
    p1_concept_2: "Een radiaal draagstructuursysteem van bamboepalen en ringbalken draagt ver uitkragende daken, waardoor passieve koeling mogelijk is door kruisventilatie en beschaduwde circulatie.",
    p1_concept_3: "Kleurrijke doorschijnende panelen in kobaltblauw, barnsteengeel en limoengroen accentueren de aardetinten gevels, filteren licht in de klaslokalen en markeren drempels tussen leer- en ontmoetingsruimtes. Het binnenplaatsamfitheater fungeert als multifunctionele culturele ruimte \u2014 de school als sociaal knooppunt.",
    p2_headline: "IPAI Communicatiecentrum",
    p2_lbl_left: "IPAI Communicatiecentrum",
    p2_lbl_right: "Heilbronn, Duitsland",
    p2_sidebar_3: "Een cilindrisch communicatiecentrum in het hart van een 30 hectare groot AI-campus \u2014 het publieke gezicht van het Innovatiepark Kunstmatige Intelligentie in Heilbronn.",
    p2_sidebar_4: "Reflecterende gevels, verhoogde terrassen met ge\u00efntegreerde beplanting en een actieve ring van 1,2 km \u2014 ontworpen voor welzijn in een technologische omgeving.",
    p2_bigtext: "Hoe kan architectuur technologische innovatie vertalen naar ruimtelijke vorm? Het project combineert een dynamische gevel met een open ruimtelijk concept om een nieuwe publieke interface te cre\u00ebren.",
    p2_meta_project: "IPAI Communicatiecentrum",
    p2_meta_location: "Heilbronn, Duitsland",
    p2_meta_office: "MVRDV (Stage)",
    p2_meta_role: "Architectuurstagiaire \u2014 Ontwerpteam Communicatiecentrum",
    p2_meta_status: "In aanbouw (bouwstart 2025)",
    p2_meta_campus: "265.000 m\u00b2",
    p2_meta_cert: "DGNB Platina (beoogd)",
    p2_concept_1: "De IPAI-campus in Heilbronn is een centrum van 30 hectare voor meer dan 5.000 onderzoekers, ontworpen door MVRDV rond een onderscheidend cirkelvormig masterplan.",
    p2_concept_2: "In het hart van de campus staat het Communicatiecentrum, een cilindrische toren met reflecterend gevel die dient als publieke interface tussen de AI-onderzoeksgemeenschap en bezoekers.",
    p2_concept_3: "Het ontwerp benadrukt menselijk welzijn als tegenwicht voor het schermintensieve AI-werk. Een autovrije campus, bioklimatische gevels, hybride houtbouw en een parametrisch landschap cre\u00ebren een omgeving waar tactiele organische materialen en ruime groene ruimtes samenwerking in de buitenlucht aanmoedigen.",
    cv_languages: "Talen",
    cv_software: "Software",
    cv_experience: "Ervaring & Projecten",
    cv_outside: "Buiten de Studio",
    cv_contact_heading: "Laten we samen een verbinding opbouwen!",
    cv_find_me: "Vind me hier",
    cv_send: "Bericht versturen",
    cv_download_cv: "CV downloaden",
    cv_download_portfolio: "Portfolio downloaden",
    cv_back: "\u2190 Terug naar portfolio",
    form_name: "Naam",
    form_email: "E-mail",
    form_subject: "Onderwerp",
    form_message: "Bericht",
    form_ph_name: "Je naam",
    form_ph_email: "Je e-mail",
    form_ph_subject: "Onderwerp",
    form_ph_message: "Je bericht",
    lang_native: "Moedertaal",
    lang_small_latinum: "Klein Latinum",
    outside_1_title: "De Buitenmens",
    outside_1_desc: "Ik voel me het meest geaard als ik buiten ben \u2013 wandelen, surfen, fietsen, skaten. Beweging en natuur vernieuwen mijn perspectief.",
    outside_2_title: "De Maker",
    outside_2_desc: "Ik bouw graag houten meubels en werk met klei. Er is iets diep bevredigends aan het vormen van materiaal met je handen.",
    outside_3_title: "Het Nieuwsgierige Oog",
    outside_3_desc: "Fotografie en reizen stellen me in staat te vertragen en aandacht te schenken. Ik word aangetrokken door licht, textuur, kleine details en het subtiele karakter van verschillende plekken.",
    outside_4_title: "De Ontdekkingsreiziger",
    outside_4_desc: "Reizen en verschillende culturen ontdekken houdt me nieuwsgierig. Nieuwe manieren van leven ervaren verruimt mijn begrip van context, schaal en menselijke interactie.",
    outside_5_title: "De Teamspeler",
    outside_5_desc: "Of het nu in sport is of bij samenwerkingsprojecten, ik gedij in teamomgevingen. Ik waardeer gedeeld momentum, vertrouwen en van anderen leren.",
    exp_1_title: "Studentassistent \u2013 TU Delft",
    exp_1_sub: "Studentassistent bij het Delft Design for Values Institute | December 2025 \u2013 heden",
    exp_1_desc: "Ondersteuning bij co\u00f6rdinatie, inhoudsontwikkeling en interdisciplinaire uitwisseling over waardegedreven ontwerp.",
    exp_2_title: "Stage bij MVRDV in Rotterdam",
    exp_2_sub: "Architectuurassistent in het DAS-team | Maart \u2013 Augustus 2025",
    exp_2_desc: "Ontwerpassistent bij MVRDV\u2019s DAS Studio, bijdragend aan het IPAI Communicatiecentrum.",
    exp_3_title: "Duurzaamheidsprijs \u201cTransformathon\u201d door Baufritz",
    exp_3_sub: "Leidende rol in team \u201cSupertecture\u201d | September 2024",
    exp_3_desc: "Erkende prijs voor uitzonderlijke bijdragen aan duurzame architectuur als onderdeel van \u201cThe Supertecture project\u201d.",
    exp_4_title: "Kerkontmanteling & Materiaalhergebruik",
    exp_4_sub: "Co\u00f6rdinatie van een vrijwilligersteam | Augustus 2024",
    exp_4_desc: "Mahoniehouten vloeren als vlaggenschipvoorbeeld van circulair (de)construeren.",
    exp_5_title: "Bachelorscriptie \u2013 The Supertecture Project",
    exp_5_sub: "Technische Universiteit M\u00fcnchen | Juli 2024",
    exp_5_desc: "De scriptie onderzocht innovatieve methoden voor materiaalhergebruik en hulpbronneneffici\u00ebnt bouwen.",
    exp_6_title: "Stage bij HTB (Hochtief-dochter)",
    exp_6_sub: "HTB Engineering and Construction S\u00e3o Paulo | Augustus \u2013 Oktober 2023",
    exp_6_desc: "Tijdens fulltime werk aan de restauratie van het Teatro Cultura Art\u00edstica in S\u00e3o Paulo deed ik praktische ervaring op in bouwmanagement.",
    exp_7_title: "Stage bij RSE+",
    exp_7_sub: "RSE+ Architekten Ingenieure GmbH G\u00f6ttingen | April 2020",
    exp_7_desc: "Deze stage gaf me mijn eerste kennismaking met het architectuurveld en hielp mijn carrierekeuze te bevestigen.",
    edu_1_degree: "Uitwisselingsprogramma in Finland",
    edu_2_degree: "MSc Architectuur, Stedenbouw en BSc",
    edu_3_degree: "Architectuur B.A.",
    edu_4_degree: "Uitwisselingsprogramma in Brazili\u00eb"
  }
};


/* =================================================
   2. LANGUAGE SWITCHER
   Applies translations to [data-i18n] elements
   and highlights the active language button.
   Persists choice in localStorage.
   ================================================= */

function setLanguage(lang) {
  var dict = I18N[lang] || I18N.en;
  var fallback = I18N.en;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    var key = el.getAttribute("data-i18n");
    var text = dict[key] || fallback[key];
    if (text) el.textContent = text;
  });

  /* Handle placeholder translations */
  document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
    var key = el.getAttribute("data-i18n-ph");
    var text = dict[key] || fallback[key];
    if (text) el.setAttribute("placeholder", text);
  });

  document.querySelectorAll(".lang").forEach(function (btn) {
    var isActive = btn.dataset.lang === lang;
    btn.style.opacity = isActive ? "1" : "0.7";
    btn.setAttribute("aria-pressed", isActive);
  });

  /* Update dropdown trigger label if present */
  var activeLabel = document.getElementById("lang-active");
  if (activeLabel) activeLabel.textContent = lang.toUpperCase();

  localStorage.setItem("lang", lang);

  /* Notify scroll engines of language change */
  window.dispatchEvent(new CustomEvent("langchange", { detail: { lang: lang, dict: dict } }));
}


/* =================================================
   3. REVEAL ANIMATIONS
   Titles  → char-by-char with mask (SplitText)
   Paragraphs → line-by-line with mask (SplitText)
   Images  → fade-up with stagger
   Called after preloader (homepage) or on load.
   Gracefully skipped when GSAP is missing.
   ================================================= */

function initReveals() {
  /* Fallback: if GSAP is missing, force-show hidden images */
  if (typeof gsap === "undefined") {
    document.querySelectorAll('[data-reveal="image"]').forEach(function (img) {
      img.style.visibility = "visible";
    });
    return;
  }

  var hasScroll  = typeof ScrollTrigger !== "undefined";
  var hasSplit   = typeof SplitText !== "undefined";
  var isSubpage  = !document.getElementById("preloader");
  var useScroll  = hasScroll && isSubpage;

  if (hasScroll) gsap.registerPlugin(ScrollTrigger);
  if (hasSplit)  gsap.registerPlugin(SplitText);

  /* Titles – char by char (requires SplitText) */
  if (hasSplit) {
    document.querySelectorAll('[data-reveal="title"]').forEach(function (el) {
      new SplitText(el, {
        type: "words, chars",
        autoSplit: true,
        mask: "chars",
        charsClass: "char",
        onSplit: function (self) {
          return gsap.from(self.chars, {
            duration: 1,
            yPercent: -120,
            scale: 1.2,
            stagger: 0.01,
            ease: "expo.out",
            scrollTrigger: useScroll
              ? { trigger: el, start: "top 90%" }
              : undefined,
          });
        },
      });
    });

    /* Paragraphs – line by line (requires SplitText) */
    document.querySelectorAll('[data-reveal="paragraph"]').forEach(function (el) {
      new SplitText(el, {
        type: "lines, words",
        autoSplit: true,
        mask: "lines",
        linesClass: "line",
        onSplit: function (self) {
          return gsap.from(self.lines, {
            duration: 0.9,
            yPercent: 105,
            stagger: 0.04,
            ease: "expo.out",
            scrollTrigger: useScroll
              ? { trigger: el, start: "top 90%" }
              : undefined,
          });
        },
      });
    });
  }

  /* Images – fade up with stagger */
  var images = document.querySelectorAll('[data-reveal="image"]');
  if (images.length) {
    gsap.fromTo(
      images,
      { yPercent: 100, autoAlpha: 0 },
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      }
    );
  }

  /* Keyhole (project pages only) */
  initKeyhole();
}


/* =================================================
   4. KEYHOLE SCROLL EFFECT (project pages)
   Blue frame with a clip-path hole that opens up
   as you scroll through the hero section.
   Hidden completely once you scroll past the hero.
   Requires GSAP + ScrollTrigger.
   ================================================= */

function initKeyhole() {
  var keyhole = document.querySelector(".keyhole");
  var hero    = document.querySelector(".section--hero");

  if (!keyhole || !hero || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  /* Frame with hole → fully open (no frame) */
  gsap.fromTo(
    keyhole,
    {
      clipPath:
        "polygon(0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0%)",
    },
    {
      clipPath:
        "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100%, 100% 100%, 100% 0%)",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onLeave: function () {
          gsap.set(keyhole, { autoAlpha: 0 });
        },
        onEnterBack: function () {
          gsap.set(keyhole, { autoAlpha: 1 });
        },
      },
    }
  );

  /* Arrow fades out on scroll start */
  gsap.to(".scroll-arrow", {
    opacity: 0,
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "+=200",
      scrub: true,
    },
  });
}


/* =================================================
   5. PRELOADER (homepage only)
   Plays on load/reload, skipped when navigating
   back from a subpage. Counter 0 → 100 in 14 steps,
   then poster shrinks into .name and bg clips away.
   Returns true if preloader ran (reveals deferred).
   Requires GSAP + Flip plugin.
   ================================================= */

function initPreloader() {
  var preloader = document.getElementById("preloader");
  if (!preloader) return false;

  /* Fallback: remove preloader if GSAP or Flip is missing */
  if (typeof gsap === "undefined" || typeof Flip === "undefined") {
    preloader.remove();
    return false;
  }

  /* Skip when navigating back from a subpage */
  var navEntry = performance.getEntriesByType("navigation")[0];
  var cameFromSubpage =
    document.referrer.includes(location.origin) &&
    navEntry &&
    navEntry.type === "navigate";

  if (cameFromSubpage) {
    preloader.remove();
    return false;
  }

  gsap.registerPlugin(Flip);

  var background = document.getElementById("preloader-bg");
  var numberEl   = document.getElementById("preloader-number");
  var poster     = document.getElementById("preloader-poster");
  var nameEl     = document.querySelector(".name");
  var progress   = { value: 0 };

  var tl = gsap.timeline({
    onComplete: function () {
      preloader.classList.add("--done");
      poster.remove();
      initReveals();
    },
  });

  /* Counter 0 → 100 in 14 chunky steps (3 s) */
  tl.to(progress, {
    duration: 3,
    ease: "steps(14)",
    value: 100,
    onUpdate: function () {
      numberEl.textContent = Math.round(progress.value);
    },
  });

  /* Poster shrinks into .name and fades out */
  tl.add(function () {
    var r = nameEl.getBoundingClientRect();
    gsap.to(poster, {
      top: r.top,
      left: r.left,
      width: r.width,
      height: r.height,
      opacity: 0,
      duration: 1,
      ease: "expo.inOut",
    });
    gsap.to(numberEl, { opacity: 0, duration: 0.4, ease: "power2.out" });
  });

  /* Background clips away (runs in parallel with poster shrink) */
  tl.fromTo(
    background,
    { clipPath: "inset(0 0 0 0)" },
    { clipPath: "inset(100% 0 0 0)", duration: 1, ease: "expo.inOut" },
    "<"
  );

  return true;
}


/* =================================================
   6. PAGE TRANSITIONS (Flip-based)
   Homepage name link → CV page title (and reverse).
   ================================================= */

function initTransitions() {
  if (typeof gsap === "undefined" || typeof Flip === "undefined") return;
  gsap.registerPlugin(Flip);

  var cvTitle  = document.getElementById("cv-title");
  var nameLink = document.getElementById("cv-name-link");
  var isCV     = !!cvTitle;
  var isHome   = !!document.getElementById("preloader");

  /* ── Homepage: intercept name link click ── */
  if (isHome) {
    var homeNameLink = document.querySelector('.name[href="pages/about.html"]');
    if (homeNameLink) {
      homeNameLink.addEventListener("click", function (e) {
        e.preventDefault();
        var rect = homeNameLink.getBoundingClientRect();
        sessionStorage.setItem("flipState", JSON.stringify({
          top: rect.top, left: rect.left,
          width: rect.width, height: rect.height,
          fontSize: getComputedStyle(homeNameLink).fontSize,
          letterSpacing: getComputedStyle(homeNameLink).letterSpacing
        }));
        gsap.to([".stage", ".langs"], {
          opacity: 0, duration: 0.3, ease: "power2.in",
          onComplete: function () { window.location.href = homeNameLink.href; }
        });
      });
    }
  }

  /* ── CV page: Flip in + reveal sections ── */
  if (isCV) {
    var sections = document.querySelectorAll("[data-cv-reveal]");
    var raw = sessionStorage.getItem("flipState");

    function revealCV() {
      /* Each section reveals on scroll */
      var revealObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var el = entry.target;
          if (entry.isIntersecting) {
            gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" });

            el.querySelectorAll(".cv-lang-fill").forEach(function (bar, i) {
              var level = bar.getAttribute("data-level") || 0;
              gsap.to(bar, { width: level + "%", duration: 1, delay: i * 0.06, ease: "power3.out" });
            });

            el.querySelectorAll(".cv-skill-fill").forEach(function (fill, i) {
              var level = fill.getAttribute("data-skill") || 0;
              gsap.to(fill, { width: level + "%", duration: 1, delay: i * 0.06, ease: "power3.out" });
            });
          } else {
            gsap.set(el, { opacity: 0, y: 30 });

            el.querySelectorAll(".cv-lang-fill").forEach(function (bar) {
              gsap.set(bar, { width: "0%" });
            });

            el.querySelectorAll(".cv-skill-fill").forEach(function (fill) {
              gsap.set(fill, { width: "0%" });
            });
          }
        });
      }, { threshold: 0.15 });

      sections.forEach(function (s) { revealObs.observe(s); });

      /* Experience entries: reveal one by one on scroll */
      var entryObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("--visible");
          } else {
            entry.target.classList.remove("--visible");
          }
        });
      }, { threshold: 0.2 });

      document.querySelectorAll(".cv-entry").forEach(function (el) {
        entryObs.observe(el);
      });

      /* Experience section title also hidden until scroll */
      var expTitle = document.querySelector(".cv-experience .cv-section-title");
      if (expTitle) {
        expTitle.style.opacity = "0";
        expTitle.style.transform = "translateY(20px)";
        expTitle.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        var titleObs = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            titleObs.disconnect();
          });
        }, { threshold: 0.2 });
        titleObs.observe(expTitle);
      }
    }

    /* ── Outside the Studio: toggle cards on tap (mobile) ── */
    document.querySelectorAll("[data-outside-card]").forEach(function (card) {
      card.addEventListener("click", function () {
        var isOpen = card.getAttribute("aria-expanded") === "true";
        /* Close all other cards */
        document.querySelectorAll("[data-outside-card]").forEach(function (c) {
          c.setAttribute("aria-expanded", "false");
        });
        /* Toggle clicked card */
        if (!isOpen) card.setAttribute("aria-expanded", "true");
      });
    });

    if (raw && nameLink) {
      sessionStorage.removeItem("flipState");
      var prev = JSON.parse(raw);

      /* Hide real title, position name link at old spot */
      gsap.set(cvTitle, { visibility: "hidden" });
      gsap.set(nameLink, {
        position: "fixed", top: prev.top, left: prev.left,
        width: prev.width, fontSize: prev.fontSize,
        letterSpacing: prev.letterSpacing, zIndex: 100
      });

      var flipState = Flip.getState(nameLink);

      /* Move name link to title position */
      var titleRect = cvTitle.getBoundingClientRect();
      var titleStyle = getComputedStyle(cvTitle);
      gsap.set(nameLink, {
        position: "fixed", top: titleRect.top, left: titleRect.left,
        width: titleRect.width, fontSize: titleStyle.fontSize,
        letterSpacing: titleStyle.letterSpacing
      });

      Flip.from(flipState, {
        duration: 0.9, ease: "expo.inOut",
        onComplete: function () {
          gsap.set(cvTitle, { visibility: "visible" });
          nameLink.removeAttribute("style");
          revealCV();
        }
      });
    } else {
      /* Direct visit — show everything */
      gsap.set(cvTitle, { visibility: "visible" });
      revealCV();
    }

    /* ── Leaving CV: reverse the Flip ── */
    function handleLeave(e, link) {
      e.preventDefault();
      gsap.to(sections, {
        opacity: 0, y: -20, duration: 0.3, ease: "power2.in"
      });
      if (nameLink) {
        var state = Flip.getState(cvTitle);
        var nameRect = nameLink.getBoundingClientRect();
        gsap.set(cvTitle, {
          position: "fixed", top: nameRect.top, left: nameRect.left,
          width: nameRect.width,
          fontSize: getComputedStyle(nameLink).fontSize,
          letterSpacing: getComputedStyle(nameLink).letterSpacing,
          zIndex: 100
        });
        gsap.set(nameLink, { opacity: 0 });
        Flip.from(state, {
          duration: 0.7, ease: "expo.inOut",
          onComplete: function () { window.location.href = link.href; }
        });
      } else {
        window.location.href = link.href;
      }
    }

    var backLink = document.querySelector('.back[href="../index.html"]');
    if (backLink) {
      backLink.addEventListener("click", function (e) { handleLeave(e, backLink); });
    }
    if (nameLink) {
      nameLink.addEventListener("click", function (e) { handleLeave(e, nameLink); });
    }
  }
}


/* =================================================
   7. BOOTSTRAP
   Language → preloader OR reveals → transitions.
   ================================================= */

/* =================================================
   HEADER COLOR AUTO-DETECT
   Samples the element behind the header and toggles
   .--inverted when the background is coloured/dark.
   ================================================= */

function initHeaderColorDetect() {
  var header = document.querySelector(".top");
  if (!header) return;

  function isLight(r, g, b) {
    /* Perceived brightness (ITU-R BT.709) */
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186;
  }

  function isNearWhite(r, g, b) {
    return r > 230 && g > 230 && b > 230;
  }

  function check() {
    if (header.classList.contains("--menu-open")) return;

    var rect = header.getBoundingClientRect();
    var x = rect.left + rect.width / 2;
    var y = rect.top + rect.height / 2;

    header.style.pointerEvents = "none";
    header.style.visibility = "hidden";
    var el = document.elementFromPoint(x, y);
    header.style.visibility = "";
    header.style.pointerEvents = "";

    if (!el) return;

    var bg = getComputedStyle(el).backgroundColor;
    var m = bg.match(/\d+/g);
    if (!m || m.length < 3) return;

    var r = +m[0], g = +m[1], b = +m[2];
    var a = m.length > 3 ? +m[3] : 1;

    if (el.closest(".block--intro") || el.classList.contains("block--intro__image") || el.classList.contains("block--intro__overlay")) {
      header.classList.add("--inverted");
    } else if (a < 0.1 || isNearWhite(r, g, b)) {
      header.classList.remove("--inverted");
    } else {
      header.classList.add("--inverted");
    }
  }

  check();
  window.addEventListener("scroll", function () {
    requestAnimationFrame(check);
  }, { passive: true });
  window.addEventListener("resize", check);
}


document.addEventListener("DOMContentLoaded", function () {
  /* Apply saved language (default: English) */
  setLanguage(localStorage.getItem("lang") || "en");

  /* Hook language buttons */
  document.querySelectorAll(".lang").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLanguage(btn.dataset.lang);
    });
  });

  /* Preloader defers reveals until it finishes;
     otherwise start reveals immediately. */
  if (!initPreloader()) {
    initReveals();
  }

  /* Page transitions */
  initTransitions();

  /* Custom cursor */
  initCursor();

  /* Mobile hamburger menu */
  initBurger();

  /* Auto-detect header colour */
  initHeaderColorDetect();
});


/* =================================================
   8. MOBILE HAMBURGER MENU
   Toggle full-screen nav overlay on mobile.
   ================================================= */

function initBurger() {
  var burger = document.querySelector(".top__burger");
  var header = document.querySelector(".top");
  if (!burger || !header) return;

  burger.addEventListener("click", function () {
    var isOpen = header.classList.toggle("--menu-open");
    burger.setAttribute("aria-expanded", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  /* Close menu when any nav link is tapped */
  header.querySelectorAll("a, .lang").forEach(function (el) {
    el.addEventListener("click", function () {
      if (header.classList.contains("--menu-open")) {
        header.classList.remove("--menu-open");
        burger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  });
}


/* =================================================
   9. CUSTOM CURSOR
   Filled blue circle → outline on clickable elements.
   ================================================= */

function initCursor() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  var cursor = document.createElement("div");
  cursor.className = "cursor";
  document.body.appendChild(cursor);

  var mx = 0, my = 0, cx = 0, cy = 0;

  document.addEventListener("mousemove", function (e) {
    mx = e.clientX;
    my = e.clientY;
  });

  function tick() {
    cx += (mx - cx) * 0.35;
    cy += (my - cy) * 0.35;
    cursor.style.left = cx + "px";
    cursor.style.top = cy + "px";
    requestAnimationFrame(tick);
  }
  tick();

  var clickables = "a, button, input, textarea, select, [role='button'], label";

  document.addEventListener("mouseover", function (e) {
    if (e.target.closest(clickables)) {
      cursor.classList.add("--clickable");
    }
  });

  document.addEventListener("mouseout", function (e) {
    if (e.target.closest(clickables)) {
      cursor.classList.remove("--clickable");
    }
  });
}
