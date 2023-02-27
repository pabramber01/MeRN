import { SliderPlaceholder, sliderVH } from '../../layout';
import { PublicationWrapper, PublicationPlaceholderAvatar } from '.';

function PublicationPlaceholder() {
  return (
    <PublicationWrapper>
      <div className="publication">
        <div className={`publication-images vh-${sliderVH}`}>
          <SliderPlaceholder />
        </div>
        <div className="publication-info">
          <div className="header">
            <h2 className="publication-title placeholder placeholder-wave col-3">
              loading...
            </h2>
          </div>
          <div className="body">
            <p>
              <span className="publication-description placeholder placeholder-wave col-10 offset-2" />
              {[...Array(3).keys()].map((i) => (
                <span
                  key={`spanPlaceholder${i}`}
                  className="publication-description placeholder placeholder-wave col-12"
                />
              ))}
              <span className="publication-description placeholder placeholder-wave col-5" />
            </p>
          </div>
          <div className="footer">
            <p>
              <span className="publication-date placeholder placeholder-wave col-7" />
            </p>
            <div className="publication-user">
              <span className="user-name h-50 placeholder placeholder-wave col-2" />
              <PublicationPlaceholderAvatar />
            </div>
          </div>
        </div>
      </div>
    </PublicationWrapper>
  );
}

export default PublicationPlaceholder;
