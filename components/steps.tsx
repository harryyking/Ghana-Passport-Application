import { Check } from "lucide-react"

interface StepsProps {
  steps: string[]
  currentStep: number
}

export function Steps({ steps, currentStep }: StepsProps) {
  return (
    <div className="relative">
      <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-gray-200" />
      <div
        className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-primary transition-[width]"
        style={{
          width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
        }}
      />
      <div className="relative z-10 flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > index + 1
          const isCurrent = currentStep === index + 1

          return (
            <div key={step} className="flex flex-col items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                  isCompleted
                    ? "bg-primary text-primary-foreground"
                    : isCurrent
                      ? "border-2 border-primary bg-white text-primary"
                      : "border-2 border-gray-200 bg-white text-gray-400"
                }`}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : <span className="text-sm">{index + 1}</span>}
              </div>
              <span className={`text-sm ${isCompleted || isCurrent ? "text-primary" : "text-gray-400"}`}>{step}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

