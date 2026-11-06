(function () {
  "use strict";

  var JSPDF_SRC = "https://cdn.jsdelivr.net/npm/jspdf@2.5.2/dist/jspdf.umd.min.js";
  var loadPromise = null;

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
        "Systems Engineer from Universidad Católica del Uruguay (UCU), graduated in December 2025. Currently a fullstack developer at GlobalUY. Also a teaching assistant for ANDIS I and ANDIS II at UCU.",
      experienceTitle: "Experience",
      educationTitle: "Education",
      projectsTitle: "Selected work",
      certificatesTitle: "Certificates",
      languagesTitle: "Languages",
      experience: [
        {
          role: "Teaching assistant  ·  ANDIS I and ANDIS II",
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
            "End-to-end work with external clients on their products, including development, testing, deployment and maintenance."
          ]
        },
        {
          role: "Fullstack developer",
          org: "Boron Studio",
          dates: "Aug 2024 – Sep 2025",
          meta: "Full-time  ·  Hybrid  ·  Montevideo",
          bullets: []
        },
        {
          role: "Freelance fullstack developer",
          org: "Infinite Software (self-employed)",
          dates: "May 2022 – Aug 2024",
          meta: "",
          bullets: []
        }
      ],
      education: [
        {
          role: "English B1  ·  In progress",
          org: "Canadian English",
          dates: "Currently studying"
        },
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
          name: "INALE planning and prediction module",
          client: "GlobalUY  ·  INALE",
          detail: "Builds the diet and the use of pastures and reserves of a dairy farm throughout the year. A solver looks for the lowest cost while meeting nutritional requirements. VM (Vaca Masa) plans the adult milking herd per hectare of vaca masa. Recría applies the same approach to growing animals: lots, weight gain and their own requirements, in a separate flow.",
          tags: "Optimization, Agriculture, Fullstack, INALE"
        },
        {
          name: "PHP site migration",
          client: "Freelance",
          detail: "Four PHP sites moved to my own hosting: setup, code updates and security hardening. Sites: centroquebracho.org.uy, trumac.com.uy, zetoragro.uy and pam.com.uy.",
          tags: "PHP, Hosting, Security"
        },
        {
          name: "Plastic Free Waters",
          client: "Freelance",
          detail: "App to report abandoned fishing nets and ocean debris.",
          tags: "AWS, React, NestJS, Lambda"
        },
        {
          name: "Promoción Supergás ANCAP",
          client: "Freelance",
          detail: "Website to oversee the monthly Supergás draw.",
          tags: "Next.js, NestJS, PostgreSQL, Docker"
        },
        {
          name: "Presupuestos App",
          client: "Freelance",
          detail: "MVP e-commerce platform for digital advertising quotes.",
          tags: "AWS, React, Express"
        },
        {
          name: "ALUR Intranet",
          client: "ALUR",
          detail: "Internal site used by more than 700 employees across Uruguay.",
          tags: "Drupal, MySQL"
        },
        {
          name: "Software Selections FUBB",
          client: "FUBB",
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
          name: "Python algorithm + AI",
          client: "Freelance",
          detail: "Automated WordPress entries with generated multimedia.",
          tags: "Python"
        },
        {
          name: "InfoTurismo19",
          client: "Liga de Fomento y Turismo de Punta del Este",
          detail: "Tourist information web app for Punta del Este.",
          tags: "PHP, MySQL"
        }
      ],
      certificates: [
        { name: "AWS Certified Cloud Practitioner", source: "AWS  ·  Professional certification", detail: "Cloud concepts, services, security and architecture." },
        { name: "Building Artificial Intelligence Agents", source: "ECI  ·  UBA  ·  2026", detail: "RAG, LLMs, prompt engineering." },
        { name: "AWS Cloud Practitioner", source: "Udemy  ·  2024", detail: "19 hours  ·  Cloud fundamentals." },
        { name: "ASP.NET Core MVC 6", source: "Udemy  ·  2024", detail: "25.5 hours  ·  Backend development." },
        { name: "Django & Django REST", source: "Udemy  ·  2024", detail: "41 hours  ·  Python APIs." },
        { name: "React: from zero to expert", source: "Udemy  ·  2022", detail: "49 hours  ·  Hooks and MERN." },
        { name: "Frontend Development", source: "UCU  ·  Computing challenge", detail: "Practical challenge credential." },
        { name: "Quality Assurance", source: "UCU  ·  Computing challenge", detail: "Practical challenge credential." },
        { name: "DevOps", source: "UCU  ·  Computing challenge", detail: "Practical challenge credential." }
      ],
      languages: "Spanish  ·  English B1, currently studying at Canadian English. English Senior 5, Instituto Cultural Anglo Uruguayo (2014 – 2020)."
    },
    es: {
      file: "CV-Tomas-Silva-Pastorini-ES.pdf",
      loading: "Preparando CV…",
      error: "No se pudo generar el CV. Intentá de nuevo.",
      role: "Ingeniero en Sistemas  ·  Desarrollador fullstack",
      location: "Montevideo, Uruguay",
      profileTitle: "Perfil",
      profile:
        "Ingeniero en Sistemas de la Universidad Católica del Uruguay (UCU), donde me recibí en diciembre de 2025. Actualmente trabajo como desarrollador fullstack en GlobalUY. También soy ayudante de ANDIS I y ANDIS II en la UCU.",
      experienceTitle: "Experiencia",
      educationTitle: "Educación",
      projectsTitle: "Trabajos seleccionados",
      certificatesTitle: "Certificados",
      languagesTitle: "Idiomas",
      experience: [
        {
          role: "Ayudante  ·  ANDIS I y ANDIS II",
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
            "Trabajo de forma End to End con clientes externos para el desarrollo de sus productos, involucrando desarrollo, testing, despliegue y mantenimiento."
          ]
        },
        {
          role: "Desarrollador fullstack",
          org: "Boron Studio",
          dates: "Ago 2024 – Sep 2025",
          meta: "Tiempo completo  ·  Híbrido  ·  Montevideo",
          bullets: []
        },
        {
          role: "Desarrollador fullstack freelance",
          org: "Infinite Software (independiente)",
          dates: "May 2022 – Ago 2024",
          meta: "",
          bullets: []
        }
      ],
      education: [
        {
          role: "Inglés B1  ·  En curso",
          org: "Canadian English",
          dates: "Cursando actualmente"
        },
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
          name: "Módulo de planificación y predicción agrícola",
          client: "GlobalUY  ·  INALE",
          detail: "",
          tags: "Optimización, Agricultura, Fullstack, INALE"
        },
        {
          name: "Migración de sitios PHP",
          client: "Freelance",
          detail: "Cuatro sitios PHP pasados a un hosting propio: puesta en marcha, actualización del código y refuerzo de seguridad. Sitios: centroquebracho.org.uy, trumac.com.uy, zetoragro.uy y pam.com.uy.",
          tags: "PHP, Hosting, Seguridad"
        },
        {
          name: "Plastic Free Waters",
          client: "Freelance",
          detail: "App para reportar redes de pesca abandonadas y residuos en el océano.",
          tags: "AWS, React, NestJS, Lambda"
        },
        {
          name: "Promoción Supergás ANCAP",
          client: "Freelance",
          detail: "Sitio para supervisar el sorteo mensual de Supergás.",
          tags: "Next.js, NestJS, PostgreSQL, Docker"
        },
        {
          name: "Presupuestos App",
          client: "Freelance",
          detail: "MVP de e-commerce para presupuestos de publicidad digital.",
          tags: "AWS, React, Express"
        },
        {
          name: "Intranet ALUR",
          client: "ALUR",
          detail: "Sitio interno usado por más de 700 empleados en todo Uruguay.",
          tags: "Drupal, MySQL"
        },
        {
          name: "Software Selections FUBB",
          client: "FUBB",
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
          name: "Algoritmo Python + IA",
          client: "Freelance",
          detail: "Entradas de WordPress automatizadas con multimedia generada.",
          tags: "Python"
        },
        {
          name: "InfoTurismo19",
          client: "Liga de Fomento y Turismo de Punta del Este",
          detail: "Aplicación web de información turística para Punta del Este.",
          tags: "PHP, MySQL"
        }
      ],
      certificates: [
        { name: "AWS Certified Cloud Practitioner", source: "AWS  ·  Certificación profesional", detail: "Conceptos de cloud, servicios, seguridad y arquitectura." },
        { name: "Construyendo Agentes de Inteligencia Artificial", source: "ECI  ·  UBA  ·  2026", detail: "RAG, LLMs, Prompt Engineering." },
        { name: "AWS Cloud Practitioner", source: "Udemy  ·  2024", detail: "19 horas  ·  Fundamentos de cloud." },
        { name: "ASP.NET Core MVC 6", source: "Udemy  ·  2024", detail: "25,5 horas  ·  Desarrollo backend." },
        { name: "Django & Django REST", source: "Udemy  ·  2024", detail: "41 horas  ·  APIs en Python." },
        { name: "React: de cero a experto", source: "Udemy  ·  2022", detail: "49 horas  ·  Hooks y MERN." },
        { name: "Frontend Development", source: "UCU  ·  Reto Informático", detail: "Credencial de desafío práctico." },
        { name: "Quality Assurance", source: "UCU  ·  Reto Informático", detail: "Credencial de desafío práctico." },
        { name: "DevOps", source: "UCU  ·  Reto Informático", detail: "Credencial de desafío práctico." }
      ],
      languages: "Español  ·  Inglés B1, en curso en Canadian English. English Senior 5, Instituto Cultural Anglo Uruguayo (2014 – 2020)."
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

  var PHOTO_DATA = "data:image/jpeg;base64,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";

  function loadProfilePhoto() {
    return Promise.resolve(PHOTO_DATA);
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
      doc.setLineWidth(0.8);
      doc.rect(photoX, photoY, photoSize, photoSize, "S");
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
    var github = "tomaspasto24.github.io";
    var linkedin = "linkedin.com/in/tomas-silva-pastorini";
    var sep = "   ·   ";
    var githubW = doc.getTextWidth(github);
    var sepW = doc.getTextWidth(sep);
    doc.textWithLink(github, margin, 42, {
      url: "https://tomaspasto24.github.io/"
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

    function bulletBlock(text) {
      setBody(9.1, false, INK);
      var wrapped = doc.splitTextToSize(text, width - 5);
      ensure(wrapped.length * line + 2);
      doc.setFillColor.apply(doc, NAVY);
      doc.circle(margin + 1.1, y - 1.1, 0.7, "F");
      doc.text(wrapped, margin + 4.5, y);
      y += wrapped.length * line + 1.6;
    }

    sectionTitle(t.projectsTitle);
    t.projects.forEach(function (project) {
      bulletBlock(
        project.name +
        "  —  " +
        project.client +
        ". " +
        project.detail +
        " (" +
        project.tags +
        ")."
      );
    });

    y += 2;
    sectionTitle(t.certificatesTitle);
    t.certificates.forEach(function (cert) {
      bulletBlock(cert.name + "  —  " + cert.source + ". " + cert.detail);
    });

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
