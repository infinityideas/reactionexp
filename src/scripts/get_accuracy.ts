function get_accuracy(submission: any, numImages: number) {
    var correct = 0;
    var imageURL;
    for (var i=0; i<numImages; i++) {
        imageURL = ((((submission[i.toString()].imageURL).split('/').at(-1)).split("_"))[0]).toUpperCase()
        if (imageURL === submission[i.toString()].answer) {
            correct++;
        }
    }

    return correct/numImages;
}

export default get_accuracy;