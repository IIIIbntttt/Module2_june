let animationTimeout = 0;

window.LinkWithAnimation = (props) => {
    const history = window.ReactRouterDOM.useHistory();
    return <a href={`#${props.to}`} {...props} onClick={(ev) => {
        ev.preventDefault();
        document.getElementById('main').classList.add('hide');
        clearTimeout(animationTimeout);
        animationTimeout = setTimeout(() => {
            history.push(props.to);
            document.getElementById('main').classList.remove('hide');
        }, 500);
    }}/>;
}
