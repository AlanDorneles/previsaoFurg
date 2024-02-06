export const TabsMenu = () => {
  return (
    <div className="tabs is-centered">
      <ul>
        <li className="is-active">
          <a>
            <span className="icon is-small">
              <i className="fas fa-image" aria-hidden="true"></i>
            </span>
            <span>Radar</span>
          </a>
        </li>
        <li>
          <a>
            <span className="icon is-small">
              <i className="fas fa-music" aria-hidden="true"></i>
            </span>
            <span>Satélite</span>
          </a>
        </li>
      </ul>
    </div>
  );
};
