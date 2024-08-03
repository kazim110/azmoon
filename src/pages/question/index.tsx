import { useQuery } from "@tanstack/react-query";
import { Question } from "@/components";
import { getQuestion } from "@/services"
import { useQuestionStore } from "@/store";
import { useAppContext } from "@/contexts";
export const QuestionPage = () => {
  const {state}= useAppContext();
  const { code, orderId } = useQuestionStore(_ => ({code: _.code, orderId: _.orderId}));

  const {
    data: response,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["question", state.code, state.orderId],
    queryFn: () => getQuestion(state.code, state.orderId.toString()),
    staleTime: 5000,
  });
  if (isError) return null;
  if (isLoading) return null;

  return (
    <div className="flex flex-col items-center align-bottom justify-end h-full w-full ">
      <Question question={response.data} />
    </div>
  );
}