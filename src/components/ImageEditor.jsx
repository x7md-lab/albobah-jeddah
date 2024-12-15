export default function ImageEditor(){

    return (
        <div className="grid gap-5 px-4 md:grid-cols-2 grid-cols-1">
				<div className="flex justify-center items-center">
					<img className="max-h-[300px]" src="Jeddah by albobah.svg" />
				</div>
            <div>
                <section className="bg-white rounded-md flex justify-center items-center p-2 h-full">
                    <div className="h-full">
                    Sun (Moon)
                    Fountain
                    Sky
                    Sea
                    Sand
                    </div>
                </section>
            </div>
        </div>
    )
}