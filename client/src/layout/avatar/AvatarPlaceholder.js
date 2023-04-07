import { AvatarWrapper } from '.';

function AvatarPlaceholder({ size, shadow, color }) {
  const isSmall = size === 'sm';

  let cls = isSmall ? 'placeholder-avatar-sm' : 'placeholder-avatar-lg';
  if (shadow) cls += isSmall ? ' shadow-sm' : ' shadow-lg';
  if (color) cls += ` text-${color}`;

  return (
    <AvatarWrapper>
      <span className={`placeholder ${cls}`}></span>
    </AvatarWrapper>
  );
}

export default AvatarPlaceholder;
