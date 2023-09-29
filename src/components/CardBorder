    <Box px={5} py={0} key={item.taskTitle}>
      <Box
        sx={{
          borderBottom: isOdd(index + 1) || index + 1 === length ? border : "",
          borderLeft: border,
          borderTop: !isOdd(index + 1) || index === 0 ? "" : border,
        }}
      >
        <Stack direction="row" gap={3} px={3} py={2}>
          <Avatar
            src={item?.taskUserDetails?.image_path}
            sx={{ position: "", right: "44px" }}
          />
          <Stack
            width="100%"
            position="relative"
            direction="column"
            right="45px"
          >
            <Stack direction="row" gap={3} alignItems="center" mb={1}>
              <Typography variant="subtitle2" color={theme.palette.grey[700]}>
                {item?.taskUserDetails?.name}
              </Typography>
              <Typography variant="caption">
                {dayjs(item.taskCreatedTime).fromNow()}
              </Typography>
            </Stack>
            <Stack
              justifyContent="space-between"
              direction="row"
              gap={3}
              alignItems="center"
              mb={1}
            >
              <Typography textTransform="capitalize" variant="subtitle1">
                {item.taskTitle}
              </Typography>
              <Stack
                gap={3}
                alignItems="center"
                direction="row"
                justifyContent="space-around"
              >
                <Typography variant="subtitle2" align="center">
                  <Chip
                    icon={
                      <WhatshotTwoToneIcon
                        // sx={{ mt: "1px" }}
                        // color="error"
                      />
                    }
                    size="small"
                    variant="outlined"
                    color="error"
                    label={dayjs(item?.taskEnddate).format("MMM DD YYYY")}
                  />
                </Typography>
                {requestFunction && (
                  <Button
                    size="small"
                    variant="outlined"
                    color="success"
                    onClick={requestFunction}
                  >
                    Request
                  </Button>
                )}
              </Stack>
            </Stack>

            <Typography fontFamily="system-ui" variant="body1" mb={2}>
              {item.taskDescription}
            </Typography>
            <Stack direction="row" spacing={1}>
              {
                //item?.skills?
                [
                  { name: "vue", id: "0" },
                  { name: "react", id: "1" },
                ].map((skill) => (
                  <Chip
                    key={skill.id}
                    label={skill.name}
                    // variant="outlined"

                    // sx={{
                    //   bgcolor: getRandomColor(),
                    // }}
                    color="secondary"
                  />
                ))
              }
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Box>
