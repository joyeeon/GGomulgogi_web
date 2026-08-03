import { MODELS, useModelStore } from "../../store/modelStore";

const ModelSelect = () => {
    const selectedModel = useModelStore((state) => state.selectedModel);
    const setSelectedModel = useModelStore((state) => state.setSelectedModel);

    return (
        <div className="flex items-center justify-center gap-2 bg-orange-200 min-w-[95%] min-h-[50px] mt-4">
            {MODELS.map((model) => (
                <button
                    key={model.id}
                    onClick={() => setSelectedModel(model)}
                    className={`btn ${selectedModel.id === model.id ? "bg-yellow-300 hover:bg-yellow-300" : ""}`}
                >
                    {model.name}
                </button>
            ))}
        </div>
    )
}

export default ModelSelect;
