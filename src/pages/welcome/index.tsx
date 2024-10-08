import { FormComponent } from "@/components";
import { SHORTCUTS } from "@/constants";
import { useAppContext } from "@/contexts";
import { useForm } from "react-hook-form";
import { toast } from "sonner"
export const Welcome = () => {
  const { state, setOrderId, setAnswer, setAnnouncer, setWinner, setStarter, setScore } = useAppContext();
  // starter
  const {IsAnnouncer,IsQuestion,IsScore,IsWinner} = state.starter
  //----- score -----
  const {
    register: registerScore,
    handleSubmit: handleSubmitScore,
    formState: { errors: errorsScore, isSubmitting: isSubmittingScore },
  } = useForm({
    defaultValues: {
      score: state.score,
    },
  });
  //----- winner -----
  const {
    register: registerWinner,
    handleSubmit: handleSubmitWinner,
    formState: { errors: errorsWinner, isSubmitting: isSubmittingWinner },
  } = useForm({
    defaultValues: {
      winner: state.winner,
    },
  });
  const {
    register: registerOrderId,
    handleSubmit: handleSubmitOrderId,
    formState: { errors: errorsOrderId, isSubmitting: isSubmittingOrderId },
  } = useForm({
    defaultValues: {
      orderId: state.orderId,
    },
  });

  const {
    register: registerAnswer,
    handleSubmit: handleSubmitAnswer,
    formState: { errors: errorsAnswer },
  } = useForm({
    defaultValues: {
      answer: state.answer,
    },
  });

  const {
    register: registerAnnouncer,
    handleSubmit: handleSubmitAnnouncer,
    formState: { errors: errorsAnnouncer },
  } = useForm({
    defaultValues: {
      announcer: state.announcer,
    },
  });

  const onSubmitOrderId = (data: any) => {
    setOrderId(data.orderId)
    toast("نوبت سوال با موفقیت ثبت شد");
  };
  const onSubmitScore = (data: any) => {
    setScore(data.score)
    toast("امتیاز با موفقیت ثبت شد");
  };
  const onSubmitWinner = (data: any) => {
    setWinner(data.winner)
    toast("برنده بازی با موفقیت ثبت شد");
  };

  const onSubmitAnswer = (data: any) => {
    setAnswer(data.answer)
    toast("جواب بازی با موفقیت ثبت شد");
  };

  const onSubmitAnnouncer = (data: any) => {
    setAnnouncer(data.announcer);
    toast("نام گوینده بازی با موفقیت ثبت شد");
  }; 

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const boolValue = Boolean(value);
    const starter = {
      IsAnnouncer: false,
      IsWinner: false,
      IsScore: false,
      IsQuestion: false,
    }
    // به روز رسانی وضعیت‌ها
    if (name === "IsAnnouncer") {
      setStarter({...starter, IsAnnouncer: boolValue})
    } else if (name === "IsQuestion") {
      setStarter({...starter, IsQuestion: boolValue})
    } else if (name === "IsScore") {
      setStarter({...starter, IsScore: boolValue})
    } else if (name === "IsWinner") {
      setStarter({...starter, IsWinner: boolValue})
    }
  };
  const BASE_URL: string = process.env.API_URL as string;
  const url = import.meta.env.VITE_API_URL;
  console.log(url)
  return <div className="container">
      <div className="row justify-content-center">
      <details className="bg-white py-3 px-3 rounded-md mb-3 flex flex-col gap-y-3">
        <summary>شارتکت ها</summary>
        <ol >
          {Object.keys(SHORTCUTS).map((shortcutKey: any) => {
            const item = SHORTCUTS[shortcutKey];
            const key = item.key;
            return (
              <li key={shortcutKey}>
                <strong>{item.title}:</strong>{' '}
                {item.ctrl && <><kbd>ctrl</kbd><span>+</span></>}
                {item.shift && <><kbd>shift</kbd><span>+</span></>}
                <kbd>{key}</kbd>
              </li>
            )
          })}
        </ol>
      </details>
          <div className="row justify-center">
            {/* orderId */}
            <FormComponent
              onSubmit={handleSubmitOrderId(onSubmitOrderId)}
              register={registerOrderId("orderId", { required: true })}
              errors={errorsOrderId.orderId}
              defaultValue={state.orderId}
              label="نوبت سوال"
              buttonText="ثبت کنید"
            /> 
            {/* answer */}
            <FormComponent
              onSubmit={handleSubmitAnswer(onSubmitAnswer)}
              register={registerAnswer("answer", { required: true })}
              errors={errorsAnswer.answer}
              defaultValue={state.answer}
              label="جواب سوال"
              buttonText="ثبت کنید"
            /> 
            {/* announcer */}
            <FormComponent
              onSubmit={handleSubmitAnnouncer(onSubmitAnnouncer)}
              register={registerAnnouncer("announcer", { required: true })}
              errors={errorsAnnouncer.announcer}
              defaultValue={state.announcer}
              label="نام گوینده"
              buttonText="ثبت کنید"
            />
            {/* winner */}
            <FormComponent
              onSubmit={handleSubmitWinner(onSubmitWinner)}
              register={registerWinner("winner", { required: true })}
              errors={errorsWinner.winner}
              defaultValue={state.winner}
              label="نام برنده بازی"
              buttonText="ثبت کنید"
            /> 
            {/* score */}
            <FormComponent
              onSubmit={handleSubmitScore(onSubmitScore)}
              register={registerScore("score", { required: true })}
              errors={errorsScore.score}
              defaultValue={state.score}
              label="امتیاز بازی"
              buttonText="ثبت کنید"
            /> 
            
          </div>
          <div className="row mt-4">
        {["IsAnnouncer", "IsScore", "IsWinner", "IsQuestion"].map(
          (item, index) => (
            <div className="col-md-3" key={index}>
              <div className="card">
                <div className="card-body">
                  <label className="form-label">
                    نمایش {item.replace("Is", "")}
                  </label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={item}
                      value="true"
                      checked={
                        item === "IsAnnouncer"
                          ? IsAnnouncer
                          : item === "IsQuestion"
                          ? IsQuestion
                          : item === "IsScore"
                          ? IsScore
                          : IsWinner
                      }
                      onChange={handleRadioChange}
                    />
                    <label className="form-check-label">فعال</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={item}
                      value="false"
                      checked={
                        item === "IsAnnouncer"
                          ? !IsAnnouncer
                          : item === "IsQuestion"
                          ? !IsQuestion
                          : item === "IsScore"
                          ? !IsScore
                          : !IsWinner
                      }
                      onChange={handleRadioChange}
                    />
                    <label className="form-check-label">غیر فعال</label>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      </div>
    </div>
};
