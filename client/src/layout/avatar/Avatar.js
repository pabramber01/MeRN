import { SuspenseImg } from '..';
import { AvatarPlaceholder, AvatarWrapper } from '.';

function Avatar({ url, size, shadow, color }) {
  const isSmall = size === 'sm';

  let cls = isSmall ? 'user-avatar-sm' : 'user-avatar-lg';
  if (shadow) cls += isSmall ? ' shadow-sm' : ' shadow-lg';
  if (color) cls += ` text-${color}`;

  return (
    <AvatarWrapper>
      <SuspenseImg
        fallback={<AvatarPlaceholder {...{ size, shadow, color }} />}
        attr={{ src: url, className: cls, alt: 'avatar' }}
      />
    </AvatarWrapper>
  );
}

export default Avatar;
