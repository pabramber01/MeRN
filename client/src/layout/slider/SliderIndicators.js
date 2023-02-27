function SliderIndicators({ id, len, index }) {
  return (
    <div className="carousel-indicators">
      {[...Array(len).keys()].map((i) => (
        <button
          key={i}
          data-bs-target={`#${id}`}
          data-bs-slide-to={i}
          className={i === index ? 'active' : undefined}
        />
      ))}
    </div>
  );
}

export default SliderIndicators;
