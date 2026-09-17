import jsonData from "../data/jsonData.json";
import ButtonComponent from "../reuseableComponents/ButtonComponent";
import InputComponent from "../reuseableComponents/InputComponent";

const iconMap = {
  people: "●",
  tasks: "✓",
  rupee: "₹",
  bell: "♧",
  calendar: "▦",
  building: "▥",
  cart: "🛒",
  plane: "✈",
  analytics: "▥",
  mail: "✉",
  bank: "♜",
  settings: "⚙",
};

function SuperAdminAdministration({ search, setSearch, onFeatureSelect }) {
  const data = jsonData.superAdminAdministration;
  const features = data.featureCards.filter((item) =>
    `${item.title} ${item.description}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <main className="super-admin-feature-page">
      <div className="feature-page-heading">
        <div>
          <h1>Administration</h1>
          <p>Home&nbsp; › &nbsp;Administration</p>
        </div>
        <div className="feature-actions">
        </div>
      </div>
      <div className="feature-metrics">
        {data.metrics.map((metric) => (
          <article className="feature-metric" key={metric.label}>
            <span className={`feature-metric-icon ${metric.color}`}>
              {iconMap[metric.icon] || metric.icon}
            </span>
            <div>
              <small>{metric.label}</small>
              <strong>{metric.value}</strong>
              <ButtonComponent>View details&nbsp; ›</ButtonComponent>
            </div>
          </article>
        ))}
      </div>
      <section className="feature-list-panel">
        <div className="feature-list-heading">
          <div>
            <h2>Administration Feature List</h2>
            <span />
          </div>
          <div className="feature-list-tools">
            <label>
              Search in features...{" "}
              <InputComponent
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="⌕"
                allowClear={false}
              />
            </label>
            <ButtonComponent>▦</ButtonComponent>
            <ButtonComponent>☷</ButtonComponent>
          </div>
        </div>
        <div className="feature-grid">
          {features.map((item) => (
            <ButtonComponent
              className="feature-card"
              key={item.title}
              onclickButton={() => onFeatureSelect(item.title)}
            >
              <span className={`feature-card-icon ${item.color}`}>
                {iconMap[item.icon] || item.icon}
              </span>
              <div>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </div>
              <b>›</b>
            </ButtonComponent>
          ))}
        </div>
        {features.length === 0 && (
          <p className="no-results">No administration features found.</p>
        )}
      </section>
      <footer className="super-footer">
        <span>About Us</span> | <span>Contact Us</span>
        <small>
          This site is best viewed in IE 11.0 or higher at a minimum screen
          resolution of 1024x768 pixels.
        </small>
      </footer>
    </main>
  );
}

export default SuperAdminAdministration;
