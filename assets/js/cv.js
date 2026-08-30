(function () {
  "use strict";

  var JSPDF_SRC = "https://cdn.jsdelivr.net/npm/jspdf@2.5.2/dist/jspdf.umd.min.js";
  var PHOTO_SRC = "assets/img/profile.jpeg";
  var loadPromise = null;
  var photoPromise = null;

  var NAVY = [43, 66, 87];
  var GOLD = [212, 153, 45];
  var INK = [36, 49, 64];
  var MUTED = [77, 92, 106];
  var WHITE = [255, 255, 255];

  var COPY = {
    en: {
      file: "CV-Tomas-Silva-Pastorini-EN.pdf",
      loading: "Preparing CV…",
      error: "The CV could not be generated. Please try again.",
      role: "Systems Engineer  ·  Fullstack developer",
      location: "Montevideo, Uruguay",
      profileTitle: "Profile",
      profile:
        "Systems Engineer, graduated from Universidad Católica del Uruguay in December 2025. Fullstack developer at GlobalUY, building an internal agricultural planning module for INALE (Instituto Nacional de la Leche). Teaching assistant for ANDIS at UCU. Previously fullstack developer at Boron Studio, and earlier freelance through Infinite Software.",
      experienceTitle: "Experience",
      educationTitle: "Education",
      projectsTitle: "Selected work",
      skillsTitle: "Technical skills",
      certificatesTitle: "Certificates",
      languagesTitle: "Languages",
      experience: [
        {
          role: "Teaching assistant  ·  ANDIS",
          org: "Universidad Católica del Uruguay",
          dates: "Mar 2026 – Present",
          meta: "Part-time  ·  On-site",
          bullets: []
        },
        {
          role: "Fullstack developer",
          org: "GlobalUY",
          dates: "Sep 2025 – Present",
          meta: "Full-time",
          bullets: [
            "Development of an internal agricultural planning and prediction module for INALE: diet, pastures and reserves for a dairy farm throughout the year.",
            "Solver that searches for the lowest cost while meeting nutritional requirements for VM and Recría.",
            "VM (Vaca Masa) plans the adult herd in production (milking) per hectare; Recría applies the same approach to growing animals — lots, weight gain and their own requirements."
          ]
        },
        {
          role: "Fullstack developer",
          org: "Boron Studio",
          dates: "Aug 2024 – Sep 2025",
          meta: "Full-time  ·  Hybrid  ·  Montevideo",
          bullets: [
            "Development of an inventory management system for a construction company.",
            "End-to-end development of costaurbana.com.uy",
            "Development of a platform to administer Plan Ceibal courses (Digital Inclusion Program)"
          ]
        },
        {
          role: "Freelance fullstack developer",
          org: "Infinite Software (self-employed)",
          dates: "May 2022 – Aug 2024",
          meta: "",
          bullets: [
            "Designed and built web products for public institutions, media and private clients, from frontend to backend and infrastructure."
          ]
        }
      ],
      education: [
        {
          role: "Systems Engineering",
          org: "Universidad Católica del Uruguay",
          dates: "2021 – December 2025"
        },
        {
          role: "English Senior 5",
          org: "Instituto Cultural Anglo Uruguayo",
          dates: "2014 – 2020"
        }
      ],
      projects: [
        {
          name: "INALE planning module",
          client: "GlobalUY  ·  INALE",
          detail: "Agricultural planning for dairy farms, with a cost-minimizing solver for VM and Recría.",
          tags: "Optimization, fullstack"
        },
        {
          name: "Plastic Free Waters",
          client: "Rotary Club IYFR",
          detail: "App to report abandoned fishing nets and ocean debris to naval authorities.",
          tags: "AWS, React, NestJS, Lambda"
        },
        {
          name: "Promoción Supergás ANCAP",
          client: "ANCAP / MATRIZ",
          detail: "Website to oversee the monthly Supergás draw.",
          tags: "Next.js, NestJS, PostgreSQL, Docker"
        },
        {
          name: "M24 frontend migration",
          client: "M24",
          detail: "Frontend migration for a Uruguayan radio and newspaper.",
          tags: "AWS, React, Next.js, Gatsby, GraphQL"
        },
        {
          name: "ALUR Intranet",
          client: "ALUR",
          detail: "Internal site used by more than 700 employees across Uruguay.",
          tags: "Drupal, PHP, MySQL"
        },
        {
          name: "Software Selections FUBB",
          client: "FUBB and Argentine Basketball Federation",
          detail: "Legacy system to manage player information for basketball federations.",
          tags: "PHP, MySQL"
        },
        {
          name: "Librería América Latina",
          client: "América Latina",
          detail: "Functional and visual reform of the bookstore's legacy system.",
          tags: "Angular, Express, PostgreSQL, Docker"
        },
        {
          name: "Presupuestos App",
          client: "Ismael Perdomo, Publicidad Digital",
          detail: "MVP e-commerce platform for digital advertising quotes.",
          tags: "AWS, React, Express"
        },
        {
          name: "InfoTurismo19",
          client: "Liga de Fomento y Turismo de Punta del Este",
          detail: "Tourist information web app for Punta del Este.",
          tags: "PHP, MySQL"
        },
        {
          name: "Python algorithm + AI",
          client: "Daniel Vilche, Publicidad Digital",
          detail: "Automated WordPress entries with generated multimedia.",
          tags: "Python"
        }
      ],
      skills: [
        { label: "Frontend", value: "HTML, CSS, JavaScript, React, Angular, Next.js" },
        { label: "Backend", value: "Node.js, Express, NestJS, PHP, Python, Java, C, Drupal" },
        { label: "Data", value: "MySQL, PostgreSQL" },
        { label: "Cloud & tools", value: "AWS, DigitalOcean, Docker, Git" }
      ],
      certificates:
        "Creation of AI agents (UBA / ECI), AWS Cloud Practitioner (Udemy), .NET, Django, React, AWS, Frontend challenge, Quality assurance, DevOps challenge",
      languages: "Spanish  ·  English (Senior 5, Instituto Cultural Anglo Uruguayo), currently studying Canadian English"
    },
    es: {
      file: "CV-Tomas-Silva-Pastorini-ES.pdf",
      loading: "Preparando CV…",
      error: "No se pudo generar el CV. Intentá de nuevo.",
      role: "Ingeniero en Sistemas  ·  Desarrollador fullstack",
      location: "Montevideo, Uruguay",
      profileTitle: "Perfil",
      profile:
        "Ingeniero en Sistemas, egresado de la Universidad Católica del Uruguay en diciembre de 2025. Desarrollador fullstack en GlobalUY, donde construyo un módulo interno de planificación agrícola para INALE (Instituto Nacional de la Leche). También soy ayudante de ANDIS en UCU. Antes fui desarrollador fullstack en Boron Studio y trabajé como freelance a través de Infinite Software.",
      experienceTitle: "Experiencia",
      educationTitle: "Educación",
      projectsTitle: "Trabajos seleccionados",
      skillsTitle: "Tecnologías",
      certificatesTitle: "Certificados",
      languagesTitle: "Idiomas",
      experience: [
        {
          role: "Ayudante  ·  ANDIS",
          org: "Universidad Católica del Uruguay",
          dates: "Mar 2026 – Actualidad",
          meta: "Tiempo parcial  ·  Presencial",
          bullets: []
        },
        {
          role: "Desarrollador fullstack",
          org: "GlobalUY",
          dates: "Sep 2025 – Actualidad",
          meta: "Tiempo completo",
          bullets: [
            "Desarrollo de un módulo interno de planificación y predicción agrícola para INALE: dieta, pasturas y reservas de un tambo a lo largo del año.",
            "Solver que busca el menor costo cumpliendo los requerimientos nutricionales para VM y Recría.",
            "VM (Vaca Masa) planifica el rodeo adulto en producción (ordeñe) por hectárea; Recría aplica el mismo enfoque a animales en crecimiento — lotes, ganancia de peso y sus propios requerimientos."
          ]
        },
        {
          role: "Desarrollador fullstack",
          org: "Boron Studio",
          dates: "Ago 2024 – Sep 2025",
          meta: "Tiempo completo  ·  Híbrido  ·  Montevideo",
          bullets: [
            "Desarrollo de un sistema de gestión de inventario para una empresa de construcción.",
            "Desarrollo completo de costaurbana.com.uy",
            "Desarrollo de plataforma para administración de cursos de Plan Ceibal (Programa de Inclusión Digital)",
          ]
        },
        {
          role: "Desarrollador fullstack freelance",
          org: "Infinite Software (independiente)",
          dates: "May 2022 – Ago 2024",
          meta: "",
          bullets: [
            "Diseño y desarrollo de productos web para instituciones públicas, medios y clientes privados, de frontend a backend e infraestructura."
          ]
        }
      ],
      education: [
        {
          role: "Ingeniería en Sistemas",
          org: "Universidad Católica del Uruguay",
          dates: "2021 – Diciembre 2025"
        },
        {
          role: "English Senior 5",
          org: "Instituto Cultural Anglo Uruguayo",
          dates: "2014 – 2020"
        }
      ],
      projects: [
        {
          name: "Módulo de planificación INALE",
          client: "GlobalUY  ·  INALE",
          detail: "Planificación agrícola para tambos, con un solver que minimiza el costo para VM y Recría.",
          tags: "Optimización, fullstack"
        },
        {
          name: "Plastic Free Waters",
          client: "Rotary Club IYFR",
          detail: "App para reportar redes de pesca abandonadas y residuos en el océano a las autoridades navales.",
          tags: "AWS, React, NestJS, Lambda"
        },
        {
          name: "Promoción Supergás ANCAP",
          client: "ANCAP / MATRIZ",
          detail: "Sitio para supervisar el sorteo mensual de Supergás.",
          tags: "Next.js, NestJS, PostgreSQL, Docker"
        },
        {
          name: "Migración frontend de M24",
          client: "M24",
          detail: "Migración frontend de un medio radial y escrito uruguayo.",
          tags: "AWS, React, Next.js, Gatsby, GraphQL"
        },
        {
          name: "Intranet ALUR",
          client: "ALUR",
          detail: "Sitio interno usado por más de 700 empleados en todo Uruguay.",
          tags: "Drupal, PHP, MySQL"
        },
        {
          name: "Software Selections FUBB",
          client: "FUBB y Federación Argentina de Básquetbol",
          detail: "Sistema legacy para gestionar información de jugadores de federaciones de básquetbol.",
          tags: "PHP, MySQL"
        },
        {
          name: "Librería América Latina",
          client: "América Latina",
          detail: "Reforma funcional y visual del sistema legacy de la librería.",
          tags: "Angular, Express, PostgreSQL, Docker"
        },
        {
          name: "Presupuestos App",
          client: "Ismael Perdomo, Publicidad Digital",
          detail: "MVP de e-commerce para presupuestos de publicidad digital.",
          tags: "AWS, React, Express"
        },
        {
          name: "InfoTurismo19",
          client: "Liga de Fomento y Turismo de Punta del Este",
          detail: "Aplicación web de información turística para Punta del Este.",
          tags: "PHP, MySQL"
        },
        {
          name: "Algoritmo Python + IA",
          client: "Daniel Vilche, Publicidad Digital",
          detail: "Generación y programación automática de entradas de WordPress con multimedia.",
          tags: "Python"
        }
      ],
      skills: [
        { label: "Frontend", value: "HTML, CSS, JavaScript, React, Angular, Next.js" },
        { label: "Backend", value: "Node.js, Express, NestJS, PHP, Python, Java, C, Drupal" },
        { label: "Datos", value: "MySQL, PostgreSQL" },
        { label: "Cloud y herramientas", value: "AWS, DigitalOcean, Docker, Git" }
      ],
      certificates:
        "Creación de agentes de IA (UBA / ECI), AWS Cloud Practitioner (Udemy), .NET, Django, React, AWS, Reto frontend, Quality assurance, Reto DevOps",
      languages: "Español  ·  Inglés (Senior 5, Instituto Cultural Anglo Uruguayo), actualmente en Canadian English"
    }
  };

  function loadJsPdf() {
    if (window.jspdf && window.jspdf.jsPDF) {
      return Promise.resolve(window.jspdf.jsPDF);
    }
    if (loadPromise) return loadPromise;

    loadPromise = new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      script.src = JSPDF_SRC;
      script.async = true;
      script.onload = function () {
        if (window.jspdf && window.jspdf.jsPDF) {
          resolve(window.jspdf.jsPDF);
        } else {
          loadPromise = null;
          reject(new Error("jsPDF missing"));
        }
      };
      script.onerror = function () {
        loadPromise = null;
        reject(new Error("jsPDF failed to load"));
      };
      document.head.appendChild(script);
    });

    return loadPromise;
  }

  function loadProfilePhoto() {
    if (photoPromise) return photoPromise;

    photoPromise = new Promise(function (resolve) {
      var img = new Image();
      img.onload = function () {
        var size = 480;
        var canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "#2b4257";
        ctx.fillRect(0, 0, size, size);
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        var side = Math.min(img.width, img.height);
        var sx = (img.width - side) / 2;
        var sy = 0;
        ctx.drawImage(img, sx, sy, side, side, 0, 0, size, size);
        resolve(canvas.toDataURL("image/jpeg", 0.92));
      };
      img.onerror = function () {
        photoPromise = null;
        resolve(null);
      };
      img.src = PHOTO_SRC;
    });

    return photoPromise;
  }

  function buildPdf(JsPDF, lang, photoData) {
    var t = COPY[lang];
    var doc = new JsPDF({ unit: "mm", format: "a4" });
    var pageW = 210;
    var pageH = 297;
    var margin = 16;
    var width = pageW - margin * 2;
    var y = 0;
    var line = 4.3;

    function ensure(needed) {
      if (y + needed > pageH - 16) {
        doc.addPage();
        y = 18;
      }
    }

    function setBody(size, bold, color) {
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.setFontSize(size);
      doc.setTextColor.apply(doc, color || INK);
    }

    function paragraph(text, size, color) {
      setBody(size || 9.4, false, color);
      var lines = doc.splitTextToSize(text, width);
      ensure(lines.length * line + 2);
      doc.text(lines, margin, y);
      y += lines.length * line + 1;
    }

    function sectionTitle(title) {
      ensure(14);
      y += 2;
      setBody(11, true, NAVY);
      doc.text(title.toUpperCase(), margin, y);
      y += 2.2;
      doc.setDrawColor.apply(doc, GOLD);
      doc.setLineWidth(0.7);
      doc.line(margin, y, margin + 22, y);
      y += 6;
    }

    function entry(item) {
      var bullets = item.bullets || [];
      ensure(16 + bullets.length * 8);

      setBody(10.4, true, INK);
      doc.text(item.role, margin, y);
      setBody(8.6, false, MUTED);
      doc.text(item.dates, pageW - margin, y, { align: "right" });
      y += 4.8;

      var orgLine = item.org + (item.meta ? "  ·  " + item.meta : "");
      setBody(9.2, false, NAVY);
      doc.text(orgLine, margin, y);
      y += 5.2;

      bullets.forEach(function (bullet) {
        setBody(9.1, false, INK);
        var wrapped = doc.splitTextToSize(bullet, width - 5);
        ensure(wrapped.length * line + 1);
        doc.setFillColor.apply(doc, NAVY);
        doc.circle(margin + 1.1, y - 1.1, 0.7, "F");
        doc.text(wrapped, margin + 4.5, y);
        y += wrapped.length * line + 1.1;
      });

      y += 3.2;
    }

    var headerH = 52;
    var photoSize = 38;
    var photoX = pageW - margin - photoSize;
    var photoY = (headerH - photoSize) / 2;

    doc.setFillColor.apply(doc, NAVY);
    doc.rect(0, 0, pageW, headerH, "F");
    doc.setFillColor.apply(doc, GOLD);
    doc.rect(0, headerH, pageW, 1.4, "F");

    if (photoData) {
      doc.addImage(photoData, "JPEG", photoX, photoY, photoSize, photoSize);
      doc.setDrawColor.apply(doc, GOLD);
      doc.setLineWidth(0.9);
      doc.circle(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2 + 0.3, "S");
    }

    var headerTextW = photoData ? photoX - margin - 6 : width;

    setBody(20, true, WHITE);
    doc.text("Tomás Silva Pastorini", margin, 18);

    setBody(10.5, false, GOLD);
    doc.text(t.role, margin, 26.5);

    setBody(8.4, false, [230, 236, 240]);
    var contact =
      t.location +
      "   ·   +598 92 275 557   ·   tomaspasto24@gmail.com";
    var contactLines = doc.splitTextToSize(contact, headerTextW);
    doc.text(contactLines, margin, 35.2);

    doc.setTextColor(230, 236, 240);
    doc.setFontSize(8.4);
    var github = "github.com/tomaspasto24";
    var linkedin = "linkedin.com/in/tomas-silva-pastorini";
    var sep = "   ·   ";
    var githubW = doc.getTextWidth(github);
    var sepW = doc.getTextWidth(sep);
    doc.textWithLink(github, margin, 42, {
      url: "https://github.com/tomaspasto24"
    });
    doc.text(sep, margin + githubW, 42);
    doc.textWithLink(linkedin, margin + githubW + sepW, 42, {
      url: "https://www.linkedin.com/in/tom%C3%A1s-silva-pastorini-9a40ab184/"
    });

    y = 62;

    sectionTitle(t.profileTitle);
    paragraph(t.profile, 9.4);

    sectionTitle(t.experienceTitle);
    t.experience.forEach(entry);

    sectionTitle(t.educationTitle);
    t.education.forEach(function (item) {
      entry({
        role: item.role,
        org: item.org,
        dates: item.dates,
        meta: "",
        bullets: []
      });
    });

    sectionTitle(t.projectsTitle);
    t.projects.forEach(function (project) {
      var block =
        project.name +
        "  —  " +
        project.client +
        ". " +
        project.detail +
        " (" +
        project.tags +
        ").";
      setBody(9.1, false, INK);
      var wrapped = doc.splitTextToSize(block, width - 5);
      ensure(wrapped.length * line + 2);
      doc.setFillColor.apply(doc, NAVY);
      doc.circle(margin + 1.1, y - 1.1, 0.7, "F");
      doc.text(wrapped, margin + 4.5, y);
      y += wrapped.length * line + 1.6;
    });

    y += 2;
    sectionTitle(t.skillsTitle);
    t.skills.forEach(function (skill) {
      setBody(9.2, true, NAVY);
      var label = skill.label + ":  ";
      var labelW = doc.getTextWidth(label);
      ensure(line + 1);
      doc.text(label, margin, y);
      setBody(9.2, false, INK);
      var rest = doc.splitTextToSize(skill.value, width - labelW);
      doc.text(rest, margin + labelW, y);
      y += rest.length * line + 1.2;
    });

    y += 2;
    sectionTitle(t.certificatesTitle);
    paragraph(t.certificates, 9.2);

    sectionTitle(t.languagesTitle);
    paragraph(t.languages, 9.2);

    var pages = doc.getNumberOfPages();
    var i;
    for (i = 1; i <= pages; i += 1) {
      doc.setPage(i);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor.apply(doc, MUTED);
      doc.text("Tomás Silva Pastorini", margin, pageH - 8);
      doc.text(String(i) + " / " + pages, pageW - margin, pageH - 8, { align: "right" });
    }

    return doc;
  }

  function setBusy(button, busy, label) {
    button.disabled = busy;
    button.setAttribute("aria-busy", busy ? "true" : "false");
    button.textContent = label;
  }

  function onClick(event) {
    var button = event.currentTarget;
    var lang = button.getAttribute("data-cv-lang") === "es" ? "es" : "en";
    var t = COPY[lang];
    var original = button.textContent;

    setBusy(button, true, t.loading);

    Promise.all([loadJsPdf(), loadProfilePhoto()])
      .then(function (parts) {
        buildPdf(parts[0], lang, parts[1]).save(t.file);
        setBusy(button, false, original);
      })
      .catch(function () {
        setBusy(button, false, original);
        window.alert(t.error);
      });
  }

  document.querySelectorAll("[data-cv-lang]").forEach(function (button) {
    button.addEventListener("click", onClick);
  });
})();
