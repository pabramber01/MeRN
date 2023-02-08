import { Wrapper } from '.';

function FeedRow({ data, colsLen }) {
  const colClass = `col-md-${12 / colsLen}`;

  return (
    <Wrapper>
      <div className="row">
        {data.map(({ id, url, alt, name, likes, link, avatar }) => {
          return (
            <div key={id} className={colClass}>
              <div className="photo">
                <img src={url} alt={alt} />
                <div className="photo-info d-flex justify-content-between align-items-center">
                  <div>
                    <h4 className="m-0">{name}</h4>
                    <p className="m-0">{likes} likes</p>
                  </div>
                  <a href={link}>
                    <img src={avatar} alt="avatar" className="user-img" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
}

export default FeedRow;
