import { FeedRow } from '.';

const api = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80',
    alt: 'example',
    name: 'Example',
    avatar: 'https://gpmbroker.com/wp-content/uploads/2021/02/team-1.jpg',
    link: 'http://example.com/',
    likes: 123,
  },
  {
    id: 2,
    url: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    alt: 'example',
    name: 'Example',
    avatar: 'https://gpmbroker.com/wp-content/uploads/2021/02/team-1.jpg',
    link: 'http://example.com/',
    likes: 123,
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80',
    alt: 'example',
    name: 'Example',
    avatar: 'https://gpmbroker.com/wp-content/uploads/2021/02/team-1.jpg',
    link: 'http://example.com/',
    likes: 123,
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80',
    alt: 'example',
    name: 'Example',
    avatar: 'https://gpmbroker.com/wp-content/uploads/2021/02/team-1.jpg',
    link: 'http://example.com/',
    likes: 123,
  },
];

function Feed() {
  const dataLen = api.length;
  const colsLen = 3;
  const rowsLen = Math.ceil(dataLen / colsLen);

  return (
    <>
      {[...Array(rowsLen).keys()].map((rowIndex) => {
        return (
          <FeedRow
            key={rowIndex}
            data={api.slice(rowIndex * colsLen, (rowIndex + 1) * colsLen)}
            colsLen={colsLen}
          />
        );
      })}
    </>
  );
}

export default Feed;
