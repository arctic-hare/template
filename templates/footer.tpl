</main>
<footer class="footer">

</footer>
{literal}
    <script>
        $(document).on('click', '.js-open-popup', function () {
            var $popup = $($(this).data('popupContent'));
            $.magnificPopup.open({
                items: {
                    src: $popup,
                    type: 'inline'
                },
                showCloseBtn: false,
                preloader: false,
                fixedContentPos: true
            });
        });
        $('.js-close-popup').on('click', function () {
            $.magnificPopup.close();
        });
    </script>
{/literal}
<!--site map-->
<script src="{$doc_root}/_sm/svksitemap.js"></script>
</body>
</html>

