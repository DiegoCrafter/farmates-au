export default function About() {
  return (
    <div className="about-page">
      <h1>Sobre Farmates AU</h1>
      <p>
        Farmates AU es un proyecto comunitario hecho para backpackers y working holiday makers
        (visas 417 y 462) que buscan trabajo de temporada en granjas de Australia.
      </p>

      <h2>Qué puedes hacer aquí</h2>
      <p>
        <strong>Mapa de temporadas:</strong> toca un mes y verás las zonas de cosecha activas en
        ese momento. Los colores de los marcadores indican el tipo de trabajo (recolección,
        empaque, viñedo, hortalizas, ganadería, pesca o general).
      </p>
      <p>
        <strong>Wiki:</strong> lista de zonas con su temporada aproximada, tipo de cultivo, si
        cuenta como trabajo especificado para la visa, alojamiento típico y contacto.
      </p>
      <p>
        <strong>Aportes de la comunidad:</strong> cualquier persona puede agregar una granja con
        su contacto real. Los aportes se guardan localmente en tu navegador y se marcan como “no
        verificados” hasta que la comunidad los confirme.
      </p>

      <h2>Precisión de los datos</h2>
      <p>
        Las temporadas son <strong>aproximadas</strong> y varían cada año según el clima. Las
        fichas iniciales describen regiones reconocidas de trabajo estacional y sus contactos
        oficiales (línea nacional de cosecha y portales estatales), no granjas específicas. Los
        contactos de granjas individuales provienen de los aportes de la comunidad y deben
        confirmarse siempre antes de viajar.
      </p>
      <p>
        No afiliamos con ninguna granja ni agencia: no cobramos comisiones y no recibimos dinero
        por recomendar empleadores.
      </p>

      <h2>Cómo colaborar</h2>
      <p>
        En la pestaña <strong>Agregar</strong> puedes registrar una granja o empleador donde hayas
        trabajado: nombre, ciudad, coordenadas, temporada, contacto y condiciones. También puedes
        exportar el catálogo completo en JSON desde la pestaña <strong>Wiki</strong> para
        compartirlo o importarlo en otras herramientas.
      </p>

      <h2>Aviso importante</h2>
      <p>
        Esta herramienta es informativa y no reemplaza el asesoramiento oficial. Antes de firmar
        contratos o pagar por “trabajo garantizado”, consulta las guías del gobierno en{' '}
        <a href="https://www.harvesttrail.gov.au" target="_blank" rel="noreferrer">
          harvesttrail.gov.au
        </a>{' '}
        y los requisitos de visa en{' '}
        <a href="https://immi.homeaffairs.gov.au" target="_blank" rel="noreferrer">
          immi.homeaffairs.gov.au
        </a>
        . Desconfía de quienes pidan dinero por asegurarte un puesto.
      </p>
    </div>
  );
}
