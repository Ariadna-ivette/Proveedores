<template>
    <div>
        <b-col cols="12">
            <b-navbar class="nb-1" variant="dark" type="dark" style="margin-bottom: 40px; margin-top: 0px;" height="209px"
                width="1280px">
                <b-col cols="auto">
                    <b-row>
                        <b-navbar-brand href="#">

                            <img src="../assets/logo.svg" id="logo" class="d-inline-block  "
                                height="94px" width="94px">
                            <b class="title d-inline" font-size="28px" line-height="34px" font-style="normal"
                                font-weight="700" align-items="center">Aplicación de Ariadna</b>

                        </b-navbar-brand>
                    </b-row>
                </b-col>
            </b-navbar>
        </b-col>
    </div>
</template>

<script>

</script>

<style>
.nb-1 {
    background: #303030;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.d-inline-block {
    box-sizing: border-box;
    margin-left: 6px;
    border: 2px solid #7E1DBB;
    border-radius: 20px;
}

.title {
    position: absolute;
    width: 130px;
    height: 34px;
    left: 122px;
    top: 38px;
    font-family: Arial, Helvetica, sans-serif;
    font-style: normal;
    color: #FFFFFF;
}
</style>