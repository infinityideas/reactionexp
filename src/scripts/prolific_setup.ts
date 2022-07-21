function prolific_setup(searchParams: any) {
    window.localStorage.removeItem("SYMM_PROLIFIC_PID");

    if (searchParams.get("PROLIFIC_PID") != null) {
        window.localStorage.setItem('SYMM_PROLIFIC_PID', searchParams.get("PROLIFIC_PID") as string)
    }
}

export default prolific_setup;