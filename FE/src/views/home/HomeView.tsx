import './HomeView.css';

const HomeView = () => {
  return (
    <>
      <main>
        <section className="intro-section">
          <h2>About the Mercedes-Benz CLS</h2>
          <p>
            The Mercedes-Benz CLS is an iconic model that seamlessly combines
            elegant design, cutting-edge technology, and thrilling performance.
            From its distinctive coupe-like silhouette to its luxurious
            interior, the CLS is crafted to deliver an unparalleled driving
            experience.
          </p>
        </section>

        <section className="features-section">
          <h2>Key Features of the Mercedes-Benz CLS</h2>
          <ul>
            <li>
              <strong>Design:</strong> Sleek and aerodynamic, the CLS features a
              coupe-like roofline and a bold front grille.
            </li>
            <li>
              <strong>Performance:</strong> Equipped with powerful engines and
              advanced suspension systems for a smooth, dynamic ride.
            </li>
            <li>
              <strong>Technology:</strong> State-of-the-art infotainment system,
              advanced driver assistance features, and more.
            </li>
            <li>
              <strong>Comfort:</strong> Luxurious interiors with premium
              materials, customizable ambient lighting, and spacious seating.
            </li>
          </ul>
        </section>

        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq">
            <h3>What are the engine options for the Mercedes-Benz CLS?</h3>
            <p>
              The CLS offers a range of powerful engine options, including
              inline-6 turbo and V8 biturbo engines, providing exceptional
              performance and efficiency.
            </p>
          </div>
          <div className="faq">
            <h3>What advanced safety features are available in the CLS?</h3>
            <p>
              The CLS is equipped with numerous safety features such as Active
              Brake Assist, Lane Keeping Assist, and the innovative PRE-SAFE®
              system.
            </p>
          </div>
          <div className="faq">
            <h3>How does the CLS stand out in terms of luxury and comfort?</h3>
            <p>
              The CLS offers a luxurious cabin with high-quality materials,
              advanced climate control, and ergonomic seating designed for
              maximum comfort on long drives.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomeView;
