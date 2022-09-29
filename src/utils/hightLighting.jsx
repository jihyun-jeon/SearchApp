export const highlightedText = (sickText, searchWord) => {
  if (searchWord !== '' && sickText.includes(searchWord)) {
    const parts = sickText.split(new RegExp(`(${searchWord})`, 'gi'));

    return (
      <span>
        {parts.map((part, index) => (part === searchWord ? <mark key={index}>{part}</mark> : part))}
      </span>
    );
  }
};
