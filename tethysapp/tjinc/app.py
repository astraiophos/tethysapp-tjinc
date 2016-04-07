from tethys_sdk.base import TethysAppBase, url_map_maker


class Tjinc(TethysAppBase):
    """
    Tethys app class for TJInc.
    """

    name = 'TJInc Utah County Watershed Delineator'
    index = 'tjinc:home'
    icon = 'tjinc/images/images.jpg'
    package = 'tjinc'
    root_url = 'tjinc'
    color = '#1abc9c'
    description = 'Place a brief description of your app here.'
    enable_feedback = False
    feedback_emails = []

        
    def url_maps(self):
        """
        Add controllers
        """
        UrlMap = url_map_maker(self.root_url)

        url_maps = (UrlMap(name='home',
                           url='tjinc',
                           controller='tjinc.controllers.home'),
                    UrlMap(name='help',
                           url='tjinc/help',
                           controller='tjinc.controllers.help'),
                    UrlMap(name='buffer',
                           url='tjinc/buffer',
                           controller='tjinc.controllers.buffer'),
        )

        return url_maps