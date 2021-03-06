module.exports = class Project {
    constructor(data) {
        this.name = data.name;
        this.approot = data.approot;
        this.primary_url = data.primary_url;
        this.status = data.status ? data.status : 'stopped';
        this.type = data.type;
    }

    buildHtml() {
        let playPauseButton = 'play';
        let playPauseButtonTitle = 'Start';
        let cliDisabled = 'disabled="true"';
        if (this.status === 'running'){
            playPauseButton = 'stop';
            playPauseButtonTitle = 'Stop';
            cliDisabled = '';
        }
        return `
            <div class="project" data-project-name="`+this.name+`" data-status="`+this.status+`" data-approot="`+this.approot+`">
                <img class="folder" src="assets/img/folder.png" alt="Open Folder"/>
                <span class="name">`+this.name+`</span>
                <span class="status `+this.status+`"></span>
                <div class="buttons">
                    <i class="loading fas fa-spinner fa-pulse"></i>
                    <i class="startStop fas fa-`+playPauseButton+`" title="`+playPauseButtonTitle+`"></i>
                    <i class="startCli fas fa-terminal" `+cliDisabled+`></i>
                </div>
            </div>
        `;
    }

    render() {
        $('main').append(this.buildHtml());
    }

    update() {
        let element = $('.project[data-project-name="'+this.name+'"]')
        if (element.attr('data-status') !== this.status){
            element.replaceWith(this.buildHtml());
        }
    }
}