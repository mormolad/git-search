import style from './RepositoryDescription.module.scss';
type RepositoryDescriptionProps = {
  description: string;
};

export default function RepositoryDescription({
  description,
}: RepositoryDescriptionProps) {
  return <div className={style.repositoryDescription}>{description}</div>;
}
