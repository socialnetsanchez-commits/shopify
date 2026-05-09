import { getProducts } from '@/lib/shopify';

export default async function Home() {
  const products = await getProducts();

  return (
    <main>
      <section className="hero">
        <nav className="nav">
          <div className="logo">MS100 Store</div>
          <a className="navCta" href="#productos">Ver productos</a>
        </nav>

        <div className="heroGrid">
          <div>
            <span className="badge">Dropshipping store · Smart picks</span>
            <h1>Haz tu casa más cómoda, organizada y visual en minutos.</h1>
            <p>
              Productos prácticos de hogar, relax y cocina pensados para compras rápidas,
              regalos útiles y rutinas diarias más simples.
            </p>
            <div className="heroActions">
              <a className="primary" href="#productos">Comprar ahora</a>
              <a className="secondary" href="#beneficios">Por qué MS100</a>
            </div>
          </div>

          <div className="heroCard">
            <div className="floating one">Envío directo</div>
            <div className="floating two">Ofertas limitadas</div>
            <div className="productMock">
              <div className="mockGlow" />
              <h3>Top Pick</h3>
              <p>Organización, ambiente y bienestar para tu hogar.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="beneficios" className="benefits">
        <div>
          <h2>Compra fácil, productos útiles</h2>
          <p>Una tienda enfocada en artículos ligeros, visuales y fáciles de entender.</p>
        </div>
        <div className="benefitGrid">
          <article><strong>01</strong><h3>Problema claro</h3><p>Productos que resuelven orden, comodidad o ambiente.</p></article>
          <article><strong>02</strong><h3>Visuales para redes</h3><p>Ideales para demostraciones rápidas en TikTok, Reels y anuncios.</p></article>
          <article><strong>03</strong><h3>Compra impulsiva</h3><p>Precios pensados para reducir fricción y probar ventas rápido.</p></article>
        </div>
      </section>

      <section id="productos" className="products">
        <div className="sectionHeader">
          <span className="badge">Catálogo</span>
          <h2>Productos destacados</h2>
        </div>

        <div className="productGrid">
          {products.map((product) => (
            <article className="product" key={product.id}>
              <div className="productImage">
                {product.image ? <img src={product.image} alt={product.title} /> : <div className="placeholder" />}
              </div>
              <div className="productBody">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <div className="priceRow">
                  <span>{product.price}</span>
                  <a href={product.url} target="_blank">Ver producto</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cta">
        <h2>Ofertas especiales para mejorar tu espacio</h2>
        <p>Organiza, decora y simplifica tu día con productos seleccionados.</p>
        <a className="primary" href="#productos">Explorar ahora</a>
      </section>
    </main>
  );
}
