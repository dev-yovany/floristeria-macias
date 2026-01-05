document.addEventListener("DOMContentLoaded", () => {
  // --------- Filtros y reordenamiento ----------
  const botones = document.querySelectorAll(".filtros button");
  const articulos = document.querySelectorAll(".grid article");
  const grid = document.querySelector(".grid");

  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      // estado activo
      botones.forEach(b => b.classList.remove("activo"));
      boton.classList.add("activo");

      const filtro = boton.getAttribute("data-flor");
      const articulosArray = Array.from(articulos);

     articulosArray.forEach(articulo => {
   const categorias = articulo.getAttribute("data-flor").split(" ");
    if (filtro === "todas" || categorias.includes(filtro)) {
    articulo.classList.remove("oculto");
   } else {
    articulo.classList.add("oculto");
   }
});

      // Reordenar sin usar innerHTML para no perder estados
      const coinciden = articulosArray.filter(a => {
        const categorias = a.getAttribute("data-flor").split(" ");
        return filtro === "todas" || categorias.includes(filtro);
      });
      const noCoinciden = articulosArray.filter(a => !coinciden.includes(a));

      // Reemplaza hijos en orden
      grid.replaceChildren(...coinciden, ...noCoinciden);
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("imagen-ampliada");
  const cerrar = document.querySelector(".cerrar");
  const modalTexto = document.getElementById("modal-texto");

grid.addEventListener("click", (e) => {
  const articulo = e.target.closest("article");
  if (!articulo) return;

  const img = articulo.querySelector("img"); // toma la imagen dentro del artículo
  modal.style.display = "flex";
  modalImg.src = img.src;
  modalImg.alt = img.alt || "";


// 👉 Tomar el contenido específico del artículo 
 const detalle = articulo.querySelector(".detalle");
  if (detalle) { 
    modalTexto.innerHTML = detalle.innerHTML; // reemplaza el texto del modal 
    }
// Reinicia y acelera animación de cada línea del modal
const lineas = modalTexto.querySelectorAll("p");
lineas.forEach(p => {
  p.style.opacity = "0";
  p.style.transform = "translateX(20px)";
  p.style.animation = "none";
  void p.offsetWidth; // reinicia animación
});
lineas.forEach((p, i) => {
  // velocidad más rápida: 0.3s duración, 0.15s entre cada línea
  p.style.animation = `aparecerLinea 0.6s forwards ${0.15 * i + 0.1}s`;
});

    document.body.style.overflow = "hidden";
  // 👉 Cerrar en el siguiente clic en cualquier parte
  const cerrarConClick = () => {
    modal.style.display = "none";
    document.body.style.overflow = "";
    document.removeEventListener("click", cerrarConClick); // quitar listener
  };
  // Usamos setTimeout para evitar que el mismo clic que abre lo cierre
  setTimeout(() => {
    document.addEventListener("click", cerrarConClick);
  }, 0);
});
});

document.addEventListener("DOMContentLoaded", () => {
  const idiomaToggle = document.getElementById("idioma-toggle");

const traducciones = {
    es: {
        floristeria: "Macias",
        inicio: "Inicio",
        galeria: "Galería",
        nosotros: "Sobre Nosotros",
        contacto: "Contacto",
        titulo: "Floristería Macias",
        subtitulo: "La manera más sencilla de enviar flores a tus familiares en Cuba.",
        arreglos: "Arreglos Florales",
        todas: "Todas",
        rosas: "Rosas",
        girasoles: "Girasoles",
        lirios: "Lirios",
        orquideas: "Orquídeas",
        gladiolos: "Gladiolos",
        azucenas: "Azucenas",
        mixtos: "Mixtos",
        detalles: "Ver detalles",
        whatsapp: "WhatsApp",
        instagram: "Instagram",
        facebook: "Facebook",
        direccion: "Calle 70 #5323 53/55",
        
        // Artículo 1
        a1: "Jardín Secreto",
        d1: "Jardín Secreto (6 lirios, 3 rosas)",
        o1: "Un susurro de esperanza que termina diciendo que es ideal para celebrar un nuevo comienzo.",
        c1: "Mantén los tallos en agua fresca y corta un poco sus extremos cada dos días para prolongar su belleza.",
        
        // Artículo 2
        a2: "Elegancia Natural",
        d2: "Elegancia Natural (6 rosas, 3 lirios)",
        o2: "La fuerza del amor se suaviza con la calma de los lirios, un equilibrio perfecto que es ideal para expresar gratitud profunda.",
        c2: "Evita la luz directa del sol y cambia el agua con frecuencia para conservar su frescura.",
        
        // Artículo 3
        a3: "Caricia Floral",
        d3: "Caricia Floral (4 orquídeas, 6 rosas)",
        o3: "La delicadeza de las orquídeas junto a la intensidad de las rosas es un abrazo silencioso que es ideal para un gesto de ternura inolvidable.",
        c3: "Rocía ligeramente las orquídeas y mantén las rosas en agua limpia para que ambas florezcan más tiempo.",
        
        // Artículo 4
        a4: "Sol de Alegría",
        d4: "Sol de Alegría (15 girasoles)",
        o4: "La luz dorada de los girasoles es un canto al optimismo, un reflejo del sol que es ideal para regalar alegría en días oscuros.",
        c4: "Colócalos en un lugar iluminado y cambia el agua cada dos días para mantener su vitalidad.",
        
        // Artículo 5
        a5: "Pureza Blanca",
        d5: "Pureza Blanca (20 lirios)",
        o5: "La blancura de los lirios es un símbolo de paz interior, un silencio que acaricia el alma y es ideal para momentos de reflexión espiritual.",
        c5: "Manténlos en agua fresca y retira las flores marchitas para prolongar su pureza.",
        
        // Artículo 6
        a6: "Suspiro de Amor",
        d6: "Suspiro de Amor (10 rosas)",
        o6: "Cada rosa es un latido que se convierte en suspiro, un lenguaje secreto que es ideal para declarar un amor sincero.",
        c6: "Corta los tallos en diagonal y evita corrientes de aire para que duren más.",
        
        // Artículo 7
        a7: "Dulce Encanto",
        d7: "Dulce Encanto (10 orquídeas)",
        o7: "La elegancia de las orquídeas es un misterio que florece en silencio, ideal para transmitir admiración y respeto.",
        c7: "Rocía sus pétalos con agua y mantenlas en un ambiente húmedo para conservar su encanto.",
        
        // Artículo 8
        a8: "Día Especial",
        d8: "Día Especial (20 rosas)",
        o8: "Veinte rosas que se convierten en un coro de emociones, un regalo que es ideal para marcar un día inolvidable.",
        c8: "Cambia el agua diariamente y corta los tallos para que mantengan su frescura.",
        
        // Artículo 9
        a9: "Pasión Roja",
        d9: "Pasión Roja (100 rosas)",
        o9: "Un océano de rosas rojas que grita eternidad, un gesto desbordante que es ideal para un amor sin límites.",
        c9: "Usa un florero grande con agua abundante y retira hojas sumergidas para evitar que se marchiten rápido.",
        
        // Artículo 10
        a10: "Paz y Luz",
        d10: "Paz y Luz (10 lirios)",
        o10: "Los lirios blancos son un faro silencioso que ilumina el alma, ideal para transmitir serenidad en momentos difíciles.",
        c10: "Manténlos en agua fresca y evita la exposición directa al calor para conservar su luz.",
        
        // Artículo 11
        a11: "Canto del Sol",
        d11: "Canto del Sol (10 girasoles, 10 lirios)",
        o11: "La energía del sol se une con la calma de los lirios, un canto de esperanza que es ideal para celebrar la vida.",
        c11: "Cambia el agua con frecuencia y corta los tallos en diagonal para mantenerlos radiantes.",
        
        // Artículo 12
        a12: "Sonrisa Dorada",
        d12: "Sonrisa Dorada (10 girasoles)",
        o12: "Cada girasol es una sonrisa que se abre al mundo, ideal para regalar optimismo y amistad sincera.",
        c12: "Colócalos en un lugar iluminado y cambia el agua cada dos días para mantener su alegría.",
        
        // Artículo 13
        a13: "Primavera Viva",
        d13: "Primavera Viva (6 girasoles, 8 rosas)",
        o13: "La fuerza del sol y la pasión de las rosas se funden en un estallido de vida, ideal para celebrar la llegada de nuevos comienzos.",
        c13: "Manténlos en agua fresca y corta los tallos regularmente para prolongar su frescura.",
        
        // Artículo 14
        a14: "Vuelo de Amor",
        d14: "Vuelo de Amor (15 rosas)",
        o14: "Quince rosas que vuelan como mariposas rojas, un susurro ardiente que es ideal para un amor apasionado.",
        c14: "Cambia el agua cada día y evita la exposición directa al sol para que duren más.",
        
        // Artículo 15
        a15: "Luz Eterna",
        d15: "Luz Eterna (2 gladiolos, 2 lirios, 4 azucenas)",
        o15: "La unión de gladiolos, lirios y azucenas es un símbolo de eternidad, ideal para honrar recuerdos que nunca mueren.",
        c15: "Manténlos en agua fresca y retira las flores marchitas para conservar su armonía.",
        
        // Artículo 16
        a16: "Mariposa Dorada",
        d16: "Mariposa Dorada (4 girasoles, 14 rosas y adorno)",
        o16: "La calidez del sol y la pasión de las rosas se convierten en un vuelo dorado, ideal para celebrar la magia de un encuentro especial.",
        c16: "Cambia el agua con frecuencia y cuida los adornos para que el ramo conserve su elegancia.",
        
        // Artículo 17
        a17: "Amor Eterno",
        d17: "Amor Eterno (25 rosas y adorno)",
        o17: "Veinticinco rosas que se convierten en promesa, un gesto profundo que es ideal para sellar un amor eterno.",
        c17: "Manténlas en agua limpia y corta los tallos en diagonal para prolongar su belleza.",
        somos:"¿Quiénes somos?",
        psomos:"Somos un negocio familiar con más de 10 años de experiencia en el arte floral en Cuba. Nuestra pasión es transformar flores frescas en mensajes de amor, gratitud y esperanza. Cada arreglo que elaboramos lleva consigo el cuidado artesanal que nos distingue.",
        encargos:"¿Cómo funcionan los encargos?",
        pencargos:"Los ramos de tu preferencia se solicitan a través de cualquiera de las redes indicadas en nuestra sección de contacto. Allí puedes confirmar precios y definir la dirección de entrega. Una vez realizado el pedido, preparamos tu arreglo con dedicación y lo llevamos puntualmente hasta la dirección dada. Puedes realizar tu pedido desde cualquier lugar del mundo. Actualmente las entregas se realizan únicamente en Cuba, específicamente en las provincias de La Habana y Artemisa.",
        compromiso:"Nuestro compromiso",
        pcompromiso:"Nos comprometemos a: Ofrecer flores frescas y seleccionadas con esmero. Mantener un servicio confiable y responsable. Convertir cada pedido en un recuerdo inolvidable para quien lo recibe.",
        enlace:"¿Cómo contactarnos?",
        derechos:"© Todos los derechos reservados"
      },
    en: {
        floristeria: "Macias",
        inicio: "Home",
        galeria: "Gallery",
        nosotros: "About Us",
        contacto: "Contact",
        titulo: "Macias Florist",
        subtitulo: "The easiest way to send flowers to your family in Cuba.",
        arreglos: "Floral Arrangements",
        todas: "All",
        rosas: "Roses",
        girasoles: "Sunflowers",
        lirios: "Lilies",
        orquideas: "Orchids",
        gladiolos: "Gladioli",
        azucenas: "Madonna Lilies",
        mixtos: "Mixed",
        detalles: "View details",
        whatsapp: "WhatsApp",
        instagram: "Instagram",
        facebook: "Facebook",
        direccion: "Calle 70 #5323 53/55",
        
        // Article 1
        a1: "Secret Garden",
        d1: "Secret Garden (6 lilies, 3 roses)",
        o1: "A whisper of hope that ends by saying it's ideal for celebrating a new beginning.",
        c1: "Keep the stems in fresh water and trim their ends a little every two days to prolong their beauty.",
        
        // Article 2
        a2: "Natural Elegance",
        d2: "Natural Elegance (6 roses, 3 lilies)",
        o2: "The strength of love is softened by the calm of lilies, a perfect balance that is ideal for expressing deep gratitude.",
        c2: "Avoid direct sunlight and change the water frequently to maintain their freshness.",
        
        // Article 3
        a3: "Floral Caress",
        d3: "Floral Caress (4 orchids, 6 roses)",
        o3: "The delicacy of orchids together with the intensity of roses is a silent embrace that is ideal for an unforgettable gesture of tenderness.",
        c3: "Lightly spray the orchids and keep the roses in clean water so both bloom longer.",
        
        // Article 4
        a4: "Sun of Joy",
        d4: "Sun of Joy (15 sunflowers)",
        o4: "The golden light of sunflowers is a hymn to optimism, a reflection of the sun that is ideal for bringing joy on dark days.",
        c4: "Place them in a well-lit area and change the water every two days to maintain their vitality.",
        
        // Article 5
        a5: "White Purity",
        d5: "White Purity (20 lilies)",
        o5: "The whiteness of lilies is a symbol of inner peace, a silence that caresses the soul and is ideal for moments of spiritual reflection.",
        c5: "Keep them in fresh water and remove wilted flowers to prolong their purity.",
        
        // Article 6
        a6: "Sigh of Love",
        d6: "Sigh of Love (10 roses)",
        o6: "Each rose is a heartbeat that becomes a sigh, a secret language that is ideal for declaring sincere love.",
        c6: "Cut the stems diagonally and avoid drafts so they last longer.",
        
        // Article 7
        a7: "Sweet Charm",
        d7: "Sweet Charm (10 orchids)",
        o7: "The elegance of orchids is a mystery that blooms in silence, ideal for conveying admiration and respect.",
        c7: "Spray their petals with water and keep them in a humid environment to preserve their charm.",
        
        // Article 8
        a8: "Special Day",
        d8: "Special Day (20 roses)",
        o8: "Twenty roses that become a chorus of emotions, a gift that is ideal for marking an unforgettable day.",
        c8: "Change the water daily and cut the stems so they maintain their freshness.",
        
        // Article 9
        a9: "Red Passion",
        d9: "Red Passion (100 roses)",
        o9: "An ocean of red roses that screams eternity, an overflowing gesture that is ideal for a love without limits.",
        c9: "Use a large vase with plenty of water and remove submerged leaves to prevent them from wilting quickly.",
        
        // Article 10
        a10: "Peace and Light",
        d10: "Peace and Light (10 lilies)",
        o10: "White lilies are a silent beacon that illuminates the soul, ideal for conveying serenity in difficult times.",
        c10: "Keep them in fresh water and avoid direct exposure to heat to preserve their light.",
        
        // Article 11
        a11: "Song of the Sun",
        d11: "Song of the Sun (10 sunflowers, 10 lilies)",
        o11: "The energy of the sun joins with the calm of lilies, a song of hope that is ideal for celebrating life.",
        c11: "Change the water frequently and cut the stems diagonally to keep them radiant.",
        
        // Article 12
        a12: "Golden Smile",
        d12: "Golden Smile (10 sunflowers)",
        o12: "Each sunflower is a smile that opens to the world, ideal for giving optimism and sincere friendship.",
        c12: "Place them in a lit area and change the water every two days to maintain their joy.",
        
        // Article 13
        a13: "Living Spring",
        d13: "Living Spring (6 sunflowers, 8 roses)",
        o13: "The strength of the sun and the passion of roses merge in an explosion of life, ideal for celebrating the arrival of new beginnings.",
        c13: "Keep them in fresh water and cut the stems regularly to prolong their freshness.",
        
        // Article 14
        a14: "Flight of Love",
        d14: "Flight of Love (15 roses)",
        o14: "Fifteen roses that fly like red butterflies, a burning whisper that is ideal for a passionate love.",
        c14: "Change the water every day and avoid direct exposure to the sun so they last longer.",
        
        // Article 15
        a15: "Eternal Light",
        d15: "Eternal Light (2 gladioli, 2 lilies, 4 Madonna lilies)",
        o15: "The union of gladioli, lilies and Madonna lilies is a symbol of eternity, ideal for honoring memories that never die.",
        c15: "Keep them in fresh water and remove wilted flowers to maintain their harmony.",
        
        // Article 16
        a16: "Golden Butterfly",
        d16: "Golden Butterfly (4 sunflowers, 14 roses and decoration)",
        o16: "The warmth of the sun and the passion of roses become a golden flight, ideal for celebrating the magic of a special encounter.",
        c16: "Change the water frequently and take care of the decorations so the bouquet maintains its elegance.",
        
        // Article 17
        a17: "Eternal Love",
        d17: "Eternal Love (25 roses and decoration)",
        o17: "Twenty-five roses that become a promise, a deep gesture that is ideal for sealing an eternal love.",
        c17: "Keep them in clean water and cut the stems diagonally to prolong their beauty.",
        somos:"Who are we?",
        psomos:"We are a family business with over 10 years of experience in floral design in Cuba. Our passion is transforming fresh flowers into messages of love, gratitude, and hope. Each arrangement we create embodies the artisanal care that sets us apart.",
        encargos:"How do orders work?",
        pencargos:"Order your preferred bouquets through any of the social media platforms listed in our contact section. There you can confirm prices and specify your delivery address. Once your order is placed, we will carefully prepare your arrangement and deliver it promptly to the address provided. You can place your order from anywhere in the world. Currently, deliveries are only available in Cuba, specifically in the provinces of Havana and Artemisa.",
        compromiso:"Our commitment",
        pcompromiso:"We are committed to: Offering fresh, carefully selected flowers. Maintaining a reliable and responsible service. Making every order an unforgettable memory for the recipient.",
        enlace:"How to contact us?",
        direccion:"70th Street #5323 53/55",
        derechos:"© All rights reserved"
      }
};

  function traducirPagina(lang) {
    const diccionario = traducciones[lang];
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const clave = el.getAttribute("data-i18n");
      if (diccionario[clave]) {
        el.textContent = diccionario[clave];
      }
    });
  }

  idiomaToggle.addEventListener("click", () => {
    if (idiomaToggle.textContent === "ES") {
      idiomaToggle.textContent = "EN";
      traducirPagina("en");
    } else {
      idiomaToggle.textContent = "ES";
      traducirPagina("es");
    }
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("hamburger");
  const menu = document.getElementById("menu-principal");

  if (!btn || !menu) return;

  // Toggle menú
  btn.addEventListener("click", (e) => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!expanded));
    menu.classList.toggle("open", !expanded);

    if (!expanded) {
      // cuando se abre, enfocar el primer enlace
      const firstLink = menu.querySelector("a");
      if (firstLink) firstLink.focus();
      document.body.style.overflow = "hidden"; // opcional: evita scroll detrás del menú
    } else {
      document.body.style.overflow = "";
    }
  });
  // 👉 Cerrar al hacer clic en cualquier opción del menú 
  menu.querySelectorAll("a").forEach(link => { link.addEventListener("click", () => { btn.setAttribute("aria-expanded", "false");
     menu.classList.remove("open"); document.body.style.overflow = ""; }); });

 

  // Cerrar al hacer clic fuera del menú (en pantallas pequeñas)
  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("open")) return;
    const isClickInside = e.target.closest(".menu-principal") || e.target.closest(".hamburger");
    if (!isClickInside) {
      btn.setAttribute("aria-expanded", "false");
      menu.classList.remove("open");
      document.body.style.overflow = "";
    }
  });

  // Opcional: cerrar al cambiar tamaño de ventana (si se vuelve escritorio)
  window.addEventListener("resize", () => {
    if (window.innerWidth > 920 && menu.classList.contains("open")) {
      btn.setAttribute("aria-expanded", "false");
      menu.classList.remove("open");
      document.body.style.overflow = "";
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const footer = document.getElementById("contacto"); // tu footer
  if (!footer) return;

  // Asegúrate de que exista el overlay (si no, lo creamos)
  let overlay = document.getElementById("site-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "site-overlay";
    overlay.setAttribute("aria-hidden", "true");
    document.body.appendChild(overlay);
  }

  // Opcional: si quieres evitar que el overlay bloquee el modal o menú,
  // ajusta z-index en CSS o aquí. Actualmente está en 9999.

  // IntersectionObserver para detectar 50% de visibilidad del footer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target !== footer) return;
      if (entry.intersectionRatio >= 0.3) {
        overlay.classList.add("activo");
        // opcional: bloquear scroll cuando el overlay está activo
        // document.body.style.overflow = "hidden";
      } else {
        overlay.classList.remove("activo");
        // document.body.style.overflow = "";
      }
    });
  }, {
    root: null,
    threshold: [0, 0.5, 1] // nos interesa 0.5
  });

  observer.observe(footer);

});
