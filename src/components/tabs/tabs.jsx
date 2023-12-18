import PropTypes from 'prop-types'

export const Tabs = ({ activeTab, onClick }) => {
  const handleTabClick = (tabIndex) => {
    if (onClick) {
      onClick(tabIndex);
    }
  };

  return (
    <div className="tabs is-toggle">
      <ul>
        <li className={activeTab === 0 ? "is-active" : ""}>
          <a onClick={() => handleTabClick(0)}>
            <span>Radar</span>
          </a>
        </li>
        <li className={activeTab === 1 ? "is-active" : ""}>
          <a onClick={() => handleTabClick(1)}>
            <span>Dados</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

Tabs.propTypes = {
  activeTab: PropTypes.number,
  onClick: PropTypes.func
}