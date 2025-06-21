import View from "../../components/UI/View";

export default async function ViewPage({ params }) {
  const { id } = await params;
  return <View diaryId={id} />;
}
