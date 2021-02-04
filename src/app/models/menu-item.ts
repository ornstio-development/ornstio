export class MenuItem {

    constructor(route: string[], title: string, iconClass: string, children?: MenuItem[]) {
        this.route = route;
        this.title = title;
        this.iconClass = iconClass;
        this.children = children;
    }

    title: string;
    route: string[];
    iconClass: string;
    active: boolean = false;
    children: MenuItem[];
}
