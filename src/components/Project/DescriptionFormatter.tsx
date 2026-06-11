import styles from '../../styles/components/DescriptionFormatter.module.css';

type TextBlock = { type: 'lead' | 'paragraph'; content: string };
type ListBlock = { type: 'list'; content: ListItem[] };
type Block = TextBlock | ListBlock;

interface ListItem {
  key: string;
  value: string;
}

interface DescriptionFormatterProps {
  description: string;
}

export default function DescriptionFormatter({ description }: DescriptionFormatterProps) {
  if (!description) return null;

  const sections = description.split('\n\n');

  const blocks: Block[] = sections.map((section, index) => {
    const lines = section
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    const isList =
      lines.length > 0 &&
      lines.every((line) => {
        const parts = line.split(' : ');
        return parts.length >= 2 && parts[0].length < 40;
      });

    if (isList) {
      const listItems: ListItem[] = lines.map((line) => {
        const separatorIndex = line.indexOf(' : ');
        const key = line.substring(0, separatorIndex).trim();
        const value = line.substring(separatorIndex + 3).trim();
        return { key, value };
      });
      return { type: 'list', content: listItems };
    }

    if (index === 0) {
      return { type: 'lead', content: section };
    }

    return { type: 'paragraph', content: section };
  });

  return (
    <div className={styles.container}>
      {blocks.map((block, blockIndex) => {
        switch (block.type) {
          case 'lead':
            return (
              <p key={blockIndex} className={styles.lead}>
                {block.content}
              </p>
            );

          case 'paragraph':
            return (
              <p key={blockIndex} className={styles.paragraph}>
                {block.content}
              </p>
            );

          case 'list':
            return (
              <ul key={blockIndex} className={styles.listContainer}>
                {block.content.map((item, itemIndex) => (
                  <li key={itemIndex} className={styles.listItem}>
                    <span className={styles.keyBadge}>{item.key}</span>
                    <p className={styles.valueText}>{item.value}</p>
                  </li>
                ))}
              </ul>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
